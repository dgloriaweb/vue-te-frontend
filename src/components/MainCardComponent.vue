<template>
  <div>
    <div class="myGridColumn" v-if="storeData">
      <h3>Usual work location</h3>
      <div v-for="{ name, label, id, caseValue } in workCases" :key="id">
        <CheckboxComp
          :name="name"
          :id="id"
          :label="label"
          :case-value="caseValue"
          v-model="storeData[name]"
          @change="checkWorkCase($event, caseValue)"
        />
      </div>
      <br />
      <h3>Overtime</h3>
      <CheckboxComp
        name="overtime"
        id="overtimeChk"
        label="Want to do jobs that has overtime"
        v-model="storeData.overtime"
        @change="checkOvertime"
      />
    </div>
    <div class="myGridColumn">
      <h3>Usual working days</h3>
      <div
        v-for="{ name, id, label, key1, key2, key3 } in workingDaysCases"
        :key="id"
      >
        <CheckboxComp
          :name="name"
          :id="id"
          :label="label"
          v-model="storeData[name]"
          @change="checkCaseOfDays($event, key1, key2, key3)"
        />
      </div>
      <CheckboxComp
        name="bank_holidays"
        id="bank_holidaysChk"
        label="Can do bank holidays"
        v-model="storeData.bank_holidays"
        @change="checkBankholidays"
      />
      <h4>Special working days</h4>
      <CheckboxComp
        name="sat_sun_bh_only"
        id="sat_sun_bh_onlyChk"
        label="Want to work only Saturdays, Sundays and Bank holidays"
        v-model="storeData.sat_sun_bh_only"
        @change="checkSatsunbhonly"
      />
    </div>
    <div class="myGridColumn">
      <h3>Usual working hours</h3>
      <div v-for="{ name, id, label, func } in workingHoursList" :key="id">
        <CheckboxComp
          :name="name"
          :id="id"
          :label="label"
          v-model="storeData[name]"
          @change="workingHoursFunction($event, func)"
        />
      </div>
      <h4>Special working hours</h4>
      <div
        v-for="{ name, id, label, func } in specialWorkingHoursList"
        :key="id"
      >
        <CheckboxComp
          :name="name"
          :id="id"
          :label="label"
          v-model="storeData[name]"
          @change="specialWorkingHoursFunction($event, func)"
        />
      </div>
      <button id="show-modal" class="btn btn_primary" @click="showModalFunc">
        Store settings
      </button>
    </div>
  </div>
</template>

<script setup>
import { useJobStore } from '../store/jobstore'
import CheckboxComp from "@/components/CheckboxComp";
import { defineEmits, defineProps } from "vue";
const jobStore = useJobStore()
const emit = defineEmits(['showModalFunc'])
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  dataRoute: String
})
let storeData = jobStore[props.dataRoute]