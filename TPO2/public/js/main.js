  'use strict'

  //헤더 부분
const searchEl = document.querySelector('.search')
const searchInputEl = searchEl.querySelector('input')

searchEl.addEventListener('click', function () {
  searchInputEl.focus()
})

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused')
  searchInputEl.setAttribute('placeholder', '검색')
})

searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused')
  searchInputEl.setAttribute('placeholder', '')
})

//배지 부분
const badgeEl = document.querySelector('header .badges')
const toTopEl = document.querySelector('#to-top')
//lodash 연결부분 0.3초마다 함수 실행되게
window.addEventListener('scroll', _.throttle(function () {
  //gsap 연결부분 배지 올리고 내릴 때 스무스하게 작동
  if (window.scrollY > 500) {
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    //배지 부분이 나올때 토글 없애기
    gsap.to('#to-top', .2, {
      x: 0
    })
  } 
  //배지 부분 사라질 때 토글 나오기
  else {
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    gsap.to('#to-top', .2, {
      x: 100
    })
  }
}, 300)),
//totop toggle
toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0
  })
})

//메인화면 옷 오른쪽부터 왼쪽까지 순차적으로 옷 그림나오게
const fadeEls = document.querySelectorAll('.visual .fade-in')
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7,
    opacity: 1
  })
})

//공지사항. 수직으로 자동 넘김 
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
})

//메인화면 아랫부분 프로모션 3슬라이드
new Swiper('.promotion .swiper-container', {
  autoplay: { 
    delay: 5000 //5초 후 보여지게
  },
  loop: true,
  slidesPerView: 3, 
  spaceBetween: 10, 
  centeredSlides: true, 
//슬라이드 이전보기 다음보기
  pagination: { 
    el: '.promotion .swiper-pagination', //페이지 번호달기 
    clickable: true
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
})

//scroll magic 라이브러리 사용해서 페이지 요소에 토글 추가
const spyEls = document.querySelectorAll('section.scroll-spy')
spyEls.forEach(function (spyEl) {
  new ScrollMagic 
    .Scene({ 
      triggerElement: spyEl, //현재 보고있는 페이지 요소 실시간 확인
      triggerHook: .8  //80퍼까지 실행
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller())//
})

const thisYear = document.querySelector('.this-year')
thisYear.textContent = new Date().getFullYear()