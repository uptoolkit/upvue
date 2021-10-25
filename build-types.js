const path = require('path')
const fs = require('fs')
const glob = require('fast-glob')
const { Project } = require('ts-morph')
const { parse, compileScript } = require('@vue/compiler-sfc')

let index = 1

main()

async function main() {

  const project = new Project({
    compilerOptions: {
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      allowJs: true,
      outDir: 'types'
    },
    tsConfigFilePath: path.resolve(__dirname, './tsconfig.json'),
    skipAddingFilesFromTsConfig: true
  })

  const files = await glob(['src/**/*.ts', 'src/**/*.vue'])
  const sourceFiles = []

  await Promise.all(
    files.map(async file => {
      if (/\.vue$/.test(file)) {

        const sfc = parse(await fs.promises.readFile(file, 'utf-8'))

        const { script, scriptSetup } = sfc.descriptor

        if (script || scriptSetup) {
          let content = ''
          let isTs = false

          if (script && script.content) {
            content += script.content

            if (script.lang === 'ts') isTs = true
          }

          if (scriptSetup) {
            const compiled = compileScript(sfc.descriptor, {
              id: `${index++}`
            })

            content += compiled.content

            if (scriptSetup.lang === 'ts') isTs = true
          }

          sourceFiles.push(
            project.createSourceFile(file + (isTs ? '.ts' : '.js'), content)
          )
        }
      } else {
        sourceFiles.push(project.addSourceFileAtPath(file))
      }
    })
  )

  const diagnostics = project.getPreEmitDiagnostics()

  console.log(project.formatDiagnosticsWithColorAndContext(diagnostics))

  project.emitToMemory()

  for (const sourceFile of sourceFiles) {
    const emitOutput = sourceFile.getEmitOutput()

    for (const outputFile of emitOutput.getOutputFiles()) {
      const filePath = outputFile.getFilePath()

      await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
      await fs.promises.writeFile(filePath, outputFile.getText(), 'utf8')
    }
  }
}