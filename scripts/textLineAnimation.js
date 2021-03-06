import SplitType from 'split-type'
import gsap from 'gsap'

export const textLineAnimation = $el => {
  let $toAnimate
  let $toAnimate2

  const prepare = ($el, by = 'chars, lines') => {
    if ($el.classList.contains('splitted')) {
      return
    }
    const text = new SplitType($el, {
      types: by,
      tagName: 'span',
      lineClass: 'e-line',
    })
    text.words?.forEach(word => {
      word.innerHTML = `<span class="word-inner">${word.innerHTML}</span>`
      word.setAttribute('data-word', word.innerText)
    })

    text.lines.forEach((line, idx) => {
      line.innerHTML = `<span class="line-inner">${line.innerHTML}</span>`
      line.setAttribute('data-line', line.innerText)
      line.setAttribute('data-line-idx', idx)
    })

    $toAnimate = [...$el.querySelectorAll('.line-inner .char')]
    $toAnimate2 = [...$el.querySelectorAll('.line-inner')]
    $el.style.opacity = 1
    $el.classList.add('splitted')
  }

  return {
    in: ($el, duration = 1.8, stagger = 0.08) => {
      prepare($el)
      $el.style.opacity = 1
      const tl = gsap.timeline()
      if ($toAnimate?.length) {
        $toAnimate2.forEach(el => {
          tl.to(
            el.querySelectorAll('.char'),
            {
              duration,
              x: '0%',
              stagger,
              ease: 'expo.out',
            },
            0
          )
          tl.to(
            el.querySelectorAll('.char'),
            {
              duration: duration * 1.5,
              opacity: 1,
              stagger,
              ease: 'power3.out',
            },
            0
          )
        })
      }
    },
    in2: ($el, duration = 1.8, stagger = 0.15) => {
      prepare($el, 'lines, words')
      $el.style.opacity = 1

      if ($toAnimate2?.length) {
        $toAnimate2.forEach((el, i) => {
          setTimeout(() => {
            gsap.to(el.querySelectorAll(`[data-line-idx="${i}"] .word-inner`), {
              duration,
              y: '0%',
              opacity: 1,
              ease: 'expo.out',
            })
          }, i * stagger * 1000)
        })
      }
    },

    in3: ($el, duration = 2, stagger = 0.2) => {
      prepare($el, 'lines')
      $el.style.opacity = 1

      if ($toAnimate2?.length) {
        const to = $toAnimate2.reverse()
        gsap.to(to, {
          duration,
          y: '0%',
          rotation: 0,
          stagger,
          ease: 'expo.out',
        })

        gsap.to(to, {
          duration: duration * 1.5,
          stagger,
          opacity: 1,
          ease: 'expo.out',
        })
      }
    },
  }
}
