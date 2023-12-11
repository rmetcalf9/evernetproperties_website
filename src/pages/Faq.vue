<template>
  <q-page class="flex column main-page">
    <div class="heading">FAQ</div>
    <q-expansion-item
      label="What if I change my mind?"
    >
      <q-card>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
          commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
          eveniet doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      label="How am I protected"
    >
      <q-card>
        <q-card-section>
          TODO LINK TO https://www.thepims.co.uk/
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
          commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
          eveniet doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      label="What if something goes wrong"
    >
      <q-card>
        <q-card-section>
          TODO Complaints procedure

          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
          commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
          eveniet doloribus ullam aliquid.
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FAQPage'
})
</script>

<style>
.main-page {
  padding: 20px;
}
.heading {
  font-size: 2rem;
  font-weight: 500;
}
.question {
  font-size: 1rem;
  font-weight: 500;
}
</style>
