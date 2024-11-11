<template>
    <PlainCard class="mt-5 pb-4">
        <div>
            <div class="row">
                <div class="d-flex justify-content-center">
                    <img
                        id="korkoLogo"
                        class="image-filter translate-middle-custom"
                        src="@/assets/korkoLogo.png"
                        alt="KORKO Football Management"
                    />
                </div>
            </div>
            <form ref="formRef" class="container needs-validation pb-3" novalidate>
                <!-- Form fields -->
                <div class="row g-4 pt-4 px-md-5">
                    <!-- Contact info -->
                    <div class="col-md-6">
                        <div class="row">
                            <!-- Name -->
                            <div class="col-12">
                                <div class="form-floating pb-2">
                                    <input
                                        v-model="name"
                                        type="text"
                                        class="form-control"
                                        id="nameInput"
                                        required
                                    />
                                    <label for="nameInput" class="form-label">{{
                                        $t('contact.input-name')
                                    }}</label>
                                </div>
                            </div>

                            <!-- Email -->
                            <div class="col-12">
                                <div class="form-floating pb-2">
                                    <input
                                        v-model="email"
                                        type="email"
                                        class="form-control"
                                        id="emailInput"
                                        required
                                    />
                                    <label for="emailInput" class="form-label">{{
                                        $t('contact.input-email')
                                    }}</label>
                                </div>
                            </div>

                            <!-- Phone -->
                            <div class="col-12">
                                <div class="form-floating">
                                    <input
                                        v-model="phone"
                                        type="text"
                                        class="form-control"
                                        id="validationPhone"
                                        placeholder="01261xxxxxxx"
                                    />
                                    <label for="validationPhone" class="form-label">{{
                                        $t('contact.input-phone')
                                    }}</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Message text area -->
                    <div class="col-md-6">
                        <div class="form-floating h-100">
                            <textarea
                                v-model="message"
                                class="form-control h-100"
                                id="messageTextarea"
                                placeholder="Leave a message here"
                                required
                            ></textarea>
                            <label for="messageTextarea" class="form-label">{{
                                $t('contact.input-message')
                            }}</label>
                        </div>
                    </div>
                </div>

                <!-- Submit -->
                <div class="row">
                    <div class="d-flex justify-content-center mt-3">
                        <button
                            class="btn"
                            :class="[btnSubmitClassList]"
                            type="submit"
                        >
                            {{ $t('contact.send') }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </PlainCard>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { useServer } from '@/composables/useServer'
import PlainCard from '@/components/PlainCard.vue'

const { submitContactForm } = useServer()
const { isDark } = useTheme()
const formRef = ref(null)
const btnSubmitClassList = computed(() => [isDark.value ? 'btn-dark' : 'btn-light'])

const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')

const handleSubmit = (event) => {
    event.preventDefault()
    if (!formRef.value.checkValidity()) {
        event.stopPropagation()
    } else {
        const data = {
            name: name.value,
            email: email.value,
            phone: phone.value,
            message: message.value
        }
        submitContactForm(data)
    }
    formRef.value.classList.add('was-validated')
}

onMounted(() => {
    if (formRef.value) {
        formRef.value.addEventListener('submit', handleSubmit, false)
    }
})
</script>

<style scoped>
.translate-middle-custom {
    transform: translate(0, -20%);
}
input {
    height: 1px !important;
}
.form-control {
    border-radius: 1rem;
}
.image-filter {
    filter: drop-shadow(0 0 0.75rem rgba(0, 0, 0, 0.5));
}

#korkoLogo {
    height: 80px;
}
@media (min-width: 576px) {
    #korkoLogo {
        height: 120px;
    }
}

@media (min-width: 768px) {
    #korkoLogo {
        height: 130px;
    }
}

@media (min-width: 992px) {
    #korkoLogo {
        height: 140px;
    }
}

@media (min-width: 1200px) {
    #korkoLogo {
        height: 160px;
    }
}
</style>
