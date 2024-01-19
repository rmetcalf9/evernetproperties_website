<template>
  <q-page class="flex column main-page">
    <div class="heading">FAQ</div>
    <q-expansion-item
      label="How does this work?"
    >
      <q-card>
        <q-card-section>
          <div><q-icon :name="stage_icon" color="grey" :size="stage_icon_size" class="stage_icon" />If you're looking to find a profitable property investment then the first step is to get on our investor list. To do this let us know your name, phone and email address:</div>

          <CrmInvestorSubForm
            ref="CrmInvestorSubForm"
          ></CrmInvestorSubForm>

          <div><q-icon :name="stage_icon" color="grey" :size="stage_icon_size" class="stage_icon" />Once you have completed this we will contact you to have a conversation about your requirements and make sure that this option is suitable for you.</div>

          <div><q-icon :name="stage_icon" color="grey" :size="stage_icon_size" class="stage_icon" />Once you have become a qualified investor we will add you to our investor email list. When we find great deals where we have been able to negotiate a good price with the owner/landlord we will send these to our qualified investors. </div>

          <div><q-icon :name="stage_icon" color="grey" :size="stage_icon_size" class="stage_icon" />When you see a deal you want to text us quickly letting us know you are interested. We call investors back in the order we receive the messages. Deals will go quickly and the better the deal the quicker it will go. When we negotiate a good price it is important to get it secured quickly. When we call you; you must be in a position to reserve the deal by signing and sending us the sourcing fee.</div>

        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      label="What is a qualified investor?"
    >
      <q-card>
        <q-card-section>
          <div>A qualified investor is an investor who is ready to move quickly when the right opportunity comes along. We will be setting up deals where we negotiate a below market value price with the vendor. This means it is important to be in a position to act quickly to take the deal which is why if you are serious about getting an investment property you need to be ready.</div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      label="What do I need to be a qualified investor?"
    >
      <q-card>
        <q-card-section>
          <div>This depends on the type of deal. For a typical BRR property these are the 5 Things you need to prepare
          <ol>
            <li>Photo ID</li>
            <li>Proof of address (within last 3 months) usually a utility bill/council tax bill</li>
            <li>Mortgage brokers details (or if you are a cash buyer a screenshot of cash in your bank or similar proof of funds)</li>
            <li>Solicitor details</li>
            <li>Who’s name is the property going to be in. (Is it in your name, is it in your company name.)</li>
          </ol>
        </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>


    <q-expansion-item
      label="What if I change my mind?"
    >
      <q-card>
        <q-card-section>
          <div>The deal sourcing contract will have a cooling off period during which time you can request a refund of the sourcing fee (for any reason).</div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      label="What if a deal falls through?"
    >
      <q-card>
        <q-card-section>
          <div>There are many reasons a deal may fall through after you have paid the sourcing fee. If the deal falls through due to the buyer pulling out or some other problem on the buyers side then we will endeavour to find you a replacement property or provide a full refund of the sourcing fee.</div>

          <div>If after the cooling off period the deal falls through due to a problem at your side (for example not able to get finance) the sourcing fee is not refundable. Before buying the deal we will help you check to have the correct finance and other particulars in place; however this is your responsibility.</div>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <q-expansion-item
      label="How am I protected"
    >
      <q-card>
        <q-card-section>
          <div>Our success is directly tied to your success. Our aim is to provide profitable investment opportunities for our clients. We provide a personal service and walk you through the process clearly explaining each step along the way.</div>

          <div>We operate using industry standard deal sourcing practices and contracts. Contracts will contain a cooling off period during which time you are able to request the sourcing fee is returned.</div>

          <div>We are a member of PIMS which is an independent organisation providing redress and mediation for property investors and property entrepreneurs.</div>
        </q-card-section>
      </q-card>
    </q-expansion-item>
    <q-expansion-item
      label="What if something goes wrong"
    >
      <q-card>
        <q-card-section>
          <div>We provide a high quality service but we are human and from time to time things will inevitably go wrong. When this happens we appreciate you giving us the chance to put things right. In the first instance we are always available on whatsapp so please get in touch. If that does not work or you are still unhappy then please raise a formal complaint with us <a href="mailto:complaint@evernetproperties.com">by email</a>. </div>

          <div>We are a member of PIMS, which is an independent organisation providing redress and mediation for property investors and property entrepreneurs. If you have not received a response from us after 14 working days of raising a formal complaint or you are not happy with the response you have received then raise a complaint via the <a href="https://www.thepims.co.uk/">PIMS website</a>.</div>

          <div>Summary of Complaints Procedure</div>
          <ol>
            <li>Whatsapp message, Phone or email us directly and let us know</li>
            <li>If you are still unhappy - Raise a formal written complaint with us by email <a href="mailto:complaint@evernetproperties.com">complaint@evernetproperties.com</a></li>
            <ul>
              <li>You will get an acknowledge that we have received the email within 1 working day</li>
              <li>You will get a full written response to your complaint within 14 working days</li>
            </ul>
            <li>If your issue is still unresolved raise a complaint with PIMS at <a href="https://www.thepims.co.uk/">https://www.thepims.co.uk/</a>. Membership number 34541</li>
          </ol>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CrmInvestorSubForm from '../components/CrmInvestorSubForm.vue'

export default defineComponent({
  name: 'FAQPage',
  components: {
    CrmInvestorSubForm
  },
  data () {
    return {
      stage_icon: 'crop_square',
      stage_icon_size: '16px'
    }
  }
})
</script>

<style>
.stage_icon {
  padding: 5px;
}
a {
  color: blue;
}
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
.q-item__label {
  font-weight: 700;
}
</style>
