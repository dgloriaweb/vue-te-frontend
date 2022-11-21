<template>
  <div class="main-card-comp">
    <div class="myGridColumn" v-if="storeData">
      <h3>Usual work location</h3>
      <div
          v-for="{name, label, id, caseValue} in workCases"
          :key="id">
        <CheckboxComp
            :name="name"
            :id="id"
            :label="label"
            :case-value="caseValue"
            v-model="storeData[name]"
            @change="checkWorkCase($event, caseValue)"/>
      </div>
      <br>
      <h3>Overtime</h3>
      <CheckboxComp
          name="overtime"
          id="overtimeChk"
          label="Want to do jobs that has overtime"
          v-model="storeData.overtime"
          @change="checkOvertime"/>
    </div>
    <div class="myGridColumn">
      <h3>Usual working days</h3>
      <div
          v-for="({name, id, label, key1, key2, key3}) in workingDaysCases"
          :key="id">
        <CheckboxComp
            :name="name"
            :id="id"
            :label="label"
            v-model="storeData[name]"
            @change="checkCaseOfDays($event, key1, key2, key3)"/>
      </div>
      <CheckboxComp
          name="bank_holidays"
          id="bank_holidaysChk"
          label="Can do bank holidays"
          v-model="storeData.bank_holidays"
          @change="checkBankholidays"/>
      <h4>Special working days</h4>
      <CheckboxComp
          name="sat_sun_bh_only"
          id="sat_sun_bh_onlyChk"
          label="Want to work only Saturdays, Sundays and Bank holidays"
          v-model="storeData.sat_sun_bh_only"
          @change="checkSatsunbhonly"/>
    </div>
    <div class="myGridColumn">
      <h3>Usual working hours</h3>
      <div
          v-for="{name, id, label, func} in workingHoursList"
          :key="id">
        <CheckboxComp
            :name="name"
            :id="id"
            :label="label"
            v-model="storeData[name]"
            @change="workingHoursFunction($event, func)"/>
      </div>
      <h4>Special working hours</h4>
      <div
          v-for="{name, id, label, func} in specialWorkingHoursList"
          :key="id">
        <CheckboxComp
            :name="name"
            :id="id"
            :label="label"
            v-model="storeData[name]"
            @change="specialWorkingHoursFunction($event, func)"/>
      </div>
      <button id="show-modal"
              class="btn btn_primary"
              @click="showModalFunc">Store settings
      </button>
    </div>
  </div>

</template>

<script setup>
import {useJobStore} from '../store/jobstore'
import CheckboxComp from "@/components/CheckBoxComp";
import { defineEmits, defineProps } from "vue";

const jobStore = useJobStore()

const emit = defineEmits(['showModalFunc'])
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  dataRoute: String
})

let storeData = jobStore[props.dataRoute]

const workCases = [
  {
    label: 'Usual work location',
    name: 'workplace',
    id: 'workplaceChk',
    caseValue: 'remote'
  },
  {
    label: 'I want to work at the workplace',
    name: 'remote',
    id: 'remoteChk',
    caseValue: 'workplace'
  }
]
const workingDaysCases = [
  {
    name: 'workdays',
    id: 'workdaysChk',
    label: 'I want to work workdays',
    key1: 'saturday',
    key2: 'sunday',
    key3: 'bank_holidays'
  },
  {
    name: 'saturday',
    id: 'saturdayChk',
    label: 'Can do Saturdays',
    key1: 'workdays',
    key2: 'sunday',
    key3: 'bank_holidays'
  },
  {
    name: 'sunday',
    id: 'sundayChk',
    label: 'Can do Sundays',
    key1: 'workdays',
    key2: 'saturday',
    key3: 'bank_holidays'
  },
]
const workingHoursList = [
  {
    name: 'normal_hours',
    id: 'normal_hoursChk',
    label: 'Want to work normal hours',
    func: 'checkNormalhours'
  },
  {
    name: 'nightshift',
    id: 'nightshiftChk',
    label: 'Can do nightshift',
    func: 'checkNightshift'
  },
  {
    name: 'other_shift',
    id: 'other_shiftChk',
    label: 'Can do other shift',
    func: 'checkOthershift'
  }
]
const specialWorkingHoursList = [
  {
    name: 'nightshift_only',
    id: 'nightshift_onlyChk',
    label: 'Want to do nightshift only',
    func: 'checkNightshiftonly'
  },
  {
    name: 'other_shift_only',
    id: 'other_shift_onlyChk',
    label: 'Want to do other shift only (eg. late afternoons)',
    func: 'checkOthershiftonly'
  }
]

function showModalFunc () {
  emit('showModalFunc', )
}

/* *******************************************************
// investigate cases of checkboxes workplace and remote
**********************************************************/
function checkWorkCase (e, caseValue) {
  if (e.target.checked) {
    storeData[caseValue] = false
  }
}
function checkOvertime () {}

/* *******************************************************
// investigate cases of checkboxes days
**********************************************************/
function checkCaseOfDays (e, key1, key2, key3) {
  if (e.target.checked) {
    if (storeData[key1] === false && storeData[key2] === 1 && storeData[key3] === 1) {
      const keys = ['saturday', 'sunday', 'bank_holidays', 'sat_sun_bh_only']
      keys.forEach(key => storeData[key] = key === 'sat_sun_bh_only')
    } else {
      storeData.sat_sun_bh_only = false
    }
  }
}
function checkSatsunbhonly(e) {
  if (e.target.checked) {
    const keys = ['workdays', 'saturday', 'sunday', 'bank_holidays']
    keys.forEach(key => storeData[key] = false)
  } else {
    storeData.workdays = true
  }
}
function checkBankholidays(e) {
  if (e.target.checked) {
    if (storeData.workdays === false && storeData.saturday === 1 && storeData.sunday === 1) {
      const keys = ['saturday', 'sunday', 'bank_holidays', 'sat_sun_bh_only']
      keys.forEach(key => storeData[key] = key === 'sat_sun_bh_only')
    } else {
      storeData.sat_sun_bh_only = false
    }
  }
}

/* *******************************************************
// investigate cases of checkboxes hours
**********************************************************/
function workingHoursFunction (e, func) {
  switch (func) {
    case 'checkNormalhours':
      if (e.target.checked) {
        const keys = ['nightshift_only', 'other_shift_only']
        keys.forEach(key => storeData[key] = false)
      } else if (storeData.other_shift_only === 0) {
        storeData.nightshift = true
      }
      break;
    case 'checkNightshift':
      if (e.target.checked) {
        storeData.other_shift_only = false
        if (storeData.normal_hours === 0 && storeData.other_shift === 0) {
          storeData.nightshift_only = true
        }
      } else if (storeData.other_shift === 1) {
        storeData.other_shift_only = true
      } else if (storeData.normal_hours === 1) {
        storeData.nightshift_only = false
      }
      break;
    case 'checkOthershift' :
      if (e.target.checked) {
        storeData.nightshift_only = false
        if (storeData.normal_hours === 0 && storeData.nightshift === 0) {
          storeData.other_shift_only = true
        }

      } else if (storeData.nightshift === 1) {
        storeData.nightshift_only = true
      }
      break;

  }
}
function specialWorkingHoursFunction (e, func) {
  switch(func) {
    case 'checkNightshiftonly':
      if (e.target.checked) {
        const keys = ['normal_hours', 'nightshift', 'other_shift', 'other_shift_only']
        keys.forEach(key => storeData[key] = key === 'nightshift')
      }
      break;
    case 'checkOthershiftonly':
      if (e.target.checked) {
        const keys = ['other_shift', 'nightshift', 'nightshift_only', 'normal_hours']
        keys.forEach(key => storeData[key] = key === 'other_shift')
      }
      break;
  }
}


</script>


<style>
.main-card-comp {
  width: 1000px;
  display: flex;
}
</style>

