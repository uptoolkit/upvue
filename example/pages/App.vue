<template>
  <AppLayout>
    <div class="w-full shadow stats p-5 px-5">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div class="stat-title">Downloads</div>
        <div class="stat-value">310M</div>
        <div class="stat-desc">Jan 1st - Feb 1st</div>
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
          </svg>
        </div>
        <div class="stat-title">New Users</div>
        <div class="stat-value">4,200</div>
        <div class="stat-desc text-success">↗︎ 400 (22%)</div>
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
          </svg>
        </div>
        <div class="stat-title">New Registers</div>
        <div class="stat-value">1,200</div>
        <div class="stat-desc text-error">↘︎ 90 (14%)</div>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox">
            </label>
          </th>
          <th>Name</th>
          <th>Job</th>
          <th>Favorite Color</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox">
            </label>
          </th>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="w-12 h-12 mask mask-squircle">
                  <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component">
                </div>
              </div>
              <div>
                <div class="font-bold">
                  Hart Hagerty
                </div>
                <div class="text-sm opacity-50">
                  United States
                </div>
              </div>
            </div>
          </td>
          <td>
            Zemlak, Daniel and Leannon

            <br>
            <span class="badge badge-outline badge-sm">Desktop Support Technician</span>
          </td>
          <td>Purple</td>
          <th>
            <button class="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox">
            </label>
          </th>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="w-12 h-12 mask mask-squircle">
                  <img src="/tailwind-css-component-profile-3@56w.png" alt="Avatar Tailwind CSS Component">
                </div>
              </div>
              <div>
                <div class="font-bold">
                  Brice Swyre
                </div>
                <div class="text-sm opacity-50">
                  China
                </div>
              </div>
            </div>
          </td>
          <td>
            Carroll Group

            <br>
            <span class="badge badge-outline badge-sm">Tax Accountant</span>
          </td>
          <td>Red</td>
          <th>
            <button class="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox">
            </label>
          </th>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="w-12 h-12 mask mask-squircle">
                  <img src="/tailwind-css-component-profile-4@56w.png" alt="Avatar Tailwind CSS Component">
                </div>
              </div>
              <div>
                <div class="font-bold">
                  Marjy Ferencz
                </div>
                <div class="text-sm opacity-50">
                  Russia
                </div>
              </div>
            </div>
          </td>
          <td>
            Rowe-Schoen

            <br>
            <span class="badge badge-outline badge-sm">Office Assistant I</span>
          </td>
          <td>Crimson</td>
          <th>
            <button class="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
        <tr>
          <th>
            <label>
              <input type="checkbox" class="checkbox">
            </label>
          </th>
          <td>
            <div class="flex items-center space-x-3">
              <div class="avatar">
                <div class="w-12 h-12 mask mask-squircle">
                  <img src="/tailwind-css-component-profile-5@56w.png" alt="Avatar Tailwind CSS Component">
                </div>
              </div>
              <div>
                <div class="font-bold">
                  Yancy Tear
                </div>
                <div class="text-sm opacity-50">
                  Brazil
                </div>
              </div>
            </div>
          </td>
          <td>
            Wyman-Ledner

            <br>
            <span class="badge badge-outline badge-sm">Community Outreach Specialist</span>
          </td>
          <td>Indigo</td>
          <th>
            <button class="btn btn-ghost btn-xs">details</button>
          </th>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Job</th>
          <th>Favorite Color</th>
          <th></th>
        </tr>
        </tfoot>
      </table>
    </div>

  </AppLayout>
</template>

<script>
import AppLayout from "../../src/layouts/AppLayout.vue";
export default {
  name: "App",
  components: {AppLayout}
}
</script>

<style scoped>

</style>