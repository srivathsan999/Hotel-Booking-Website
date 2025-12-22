;(function () {
  const doc = document.documentElement
  const navbar = document.getElementById('navbar')
  const themeToggle = document.getElementById('theme-toggle')
  const themeToggleM = document.getElementById('theme-toggle-m')
  const mobileToggle = document.getElementById('mobile-toggle')
  const mobileMenu = document.getElementById('mobile-menu')
  const bookingForm = document.getElementById('booking-form')
  const contactForm = document.getElementById('contact-form')
  const loginForm = document.getElementById('login-form')
  const signupForm = document.getElementById('signup-form')

  function updateThemeIcons() {
    const isDark = doc.classList.contains('dark')
    const sunIcons = document.querySelectorAll('#sun-icon, #sun-icon-m')
    const moonIcons = document.querySelectorAll('#moon-icon, #moon-icon-m')
    
    sunIcons.forEach(icon => {
      if (isDark) {
        icon.classList.add('hidden')
      } else {
        icon.classList.remove('hidden')
      }
    })
    
    moonIcons.forEach(icon => {
      if (isDark) {
        icon.classList.remove('hidden')
      } else {
        icon.classList.add('hidden')
      }
    })
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      doc.classList.add('dark')
    } else {
      doc.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
    updateThemeIcons()
  }

  function initTheme() {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    applyTheme(stored || (prefersDark ? 'dark' : 'light'))
  }

  function toggleTheme() {
    const next = doc.classList.contains('dark') ? 'light' : 'dark'
    applyTheme(next)
  }

  function initNavbar() {
    function onScroll() {
      if (window.scrollY > 8) {
        navbar && navbar.classList.add('nav-glass')
      } else {
        navbar && navbar.classList.remove('nav-glass')
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  function initMobileMenu() {
    if (!mobileToggle || !mobileMenu) return
    mobileToggle.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden')
      mobileMenu.classList.toggle('hidden', !isHidden)
    })
  }

  function initReveal() {
    const items = Array.from(document.querySelectorAll('.reveal'))
    if (!items.length) return
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed')
          io.unobserve(e.target)
        }
      })
    }, { threshold: 0.2 })
    items.forEach(i => io.observe(i))
  }

  function initActiveNav() {
    const current = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase()
    const links = document.querySelectorAll('header .nav-link, #mobile-menu .nav-link')
    links.forEach(a => {
      const href = (a.getAttribute('href') || '').toLowerCase()
      if (href && href === current) {
        a.classList.add('nav-link-active')
      }
    })
  }

  function initForms() {
    if (bookingForm) {
      bookingForm.addEventListener('submit', e => {
        e.preventDefault()
        window.location.href = 'rooms.html'
      })
    }
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault()
        alert('Message sent. We will get back to you shortly.')
      })
    }
    if (loginForm) {
      loginForm.addEventListener('submit', e => {
        e.preventDefault()
        window.location.href = 'index.html'
      })
    }
    if (signupForm) {
      signupForm.addEventListener('submit', e => {
        e.preventDefault()
        window.location.href = 'index.html'
      })
    }
  }

  function initImageErrorHandling() {
    const images = document.querySelectorAll('img')
    images.forEach(img => {
      img.addEventListener('error', function() {
        // Fallback to a placeholder service if image fails to load
        this.src = `https://via.placeholder.com/800x600/cccccc/666666?text=${encodeURIComponent(this.alt || 'Hotel Room')}`
        this.onerror = null // Prevent infinite loop if placeholder also fails
      })
    })
  }

  initTheme()
  updateThemeIcons() // Update icons on page load
  initNavbar()
  initMobileMenu()
  initReveal()
  initForms()
  initImageErrorHandling()
  initActiveNav()
  themeToggle && themeToggle.addEventListener('click', toggleTheme)
  themeToggleM && themeToggleM.addEventListener('click', toggleTheme)
})()
