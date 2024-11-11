<script setup>
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import emblaCarouselVue from 'embla-carousel-vue'
import AutoPlay from 'embla-carousel-autoplay'
import Fade from 'embla-carousel-fade'
import SlangShow from '@/components/SlangShow.vue'

const { locale, messages } = useI18n()

// Embla Carousel Options
const emblaOpts = {
    loop: true,
    duration: 60,
    skipSnaps: false,
    direction: (locale.value == 'fa') ? 'rtl' : 'ltr'
}
const autoplayOpts = {
    delay: 6000
}

const fadeOpts = {
    align: 'center',
    containScroll: false
}

const [emblaRef, emblaApi] = emblaCarouselVue(emblaOpts, [
    AutoPlay(autoplayOpts),
    Fade(fadeOpts)
])

const slangs = computed(() => {
    const currentLocale = locale.value;
    const currentMessages = messages.value[currentLocale];
    const slangsArray = Object.values(currentMessages.slangs);

    return Array.isArray(slangsArray) ? slangsArray : []
})

watch(locale, () => {
    emblaOpts.direction = (locale.value == 'fa') ? 'rtl' : 'ltr'
    emblaApi?.value.reInit(emblaOpts)
})

</script>

<template>
    <div class="wrapper">
        <section class="embla m-auto">
            <div class="overflow-hidden" ref="emblaRef">
                <div class="embla__container d-flex">
                    <div class="
                        embla__slide
                        flex-grow-0
                        flex-shrink-0
                        align-items-center
                        align-self-center
                    " v-for="(slang, index) in slangs" :key="index">
                        <div class="
                            embla__slide__box
                            px-2
                            d-flex
                            align-items-center
                        ">
                            <SlangShow :index="index" :slang="slang" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.embla {
    max-width:100%;
    /* --slide-height: 2rem; */
    --slide-spacing: 1rem;
}
.embla__container {
    touch-action: pan-y pinch-zoom;
    margin-left: calc(var(--slide-spacing) * -1);
}
.embla__slide {
    transform: translate3d(0, 0, 0);
    flex-basis: fit-content;
    /* height: var(--slide-height); */
    min-width: 0;
}
.embla__slide__box {
    /* height: var(--slide-height); */
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0.5rem;
    user-select: none;
}
</style>
