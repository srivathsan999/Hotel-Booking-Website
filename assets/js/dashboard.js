;(function () {
  // Prevent duplicate event listeners
  const processedElements = new WeakSet()

  // User Dashboard Functions
  function initUserDashboard() {
    // Book New Stay Button
    document.querySelectorAll('a.neo-btn').forEach(btn => {
      if (btn.textContent.includes('Book New Stay') && !processedElements.has(btn)) {
        processedElements.add(btn)
        btn.addEventListener('click', (e) => {
          e.preventDefault()
          window.location.href = 'rooms.html'
        })
      }
    })

    // View Details Buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'View Details' && !processedElements.has(btn)) {
        processedElements.add(btn)
        btn.addEventListener('click', function() {
          const bookingCard = this.closest('.glass-card')
          const roomName = bookingCard?.querySelector('h3')?.textContent || 'Booking'
          showModal('Booking Details', `Viewing details for ${roomName}. This would show full booking information, cancellation policy, and modification options.`)
        })
      }
    })

    // Modify Booking Buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'Modify' && !processedElements.has(btn)) {
        processedElements.add(btn)
        btn.addEventListener('click', function() {
          const bookingCard = this.closest('.glass-card')
          const roomName = bookingCard?.querySelector('h3')?.textContent || 'Booking'
          if (confirm(`Modify booking for ${roomName}? You will be redirected to the booking modification page.`)) {
            window.location.href = 'rooms.html'
          }
        })
      }
    })

    // Cancel Booking Buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'Cancel' && !processedElements.has(btn)) {
        const bookingCard = btn.closest('.glass-card')
        if (bookingCard && bookingCard.querySelector('h3')) {
          processedElements.add(btn)
          btn.addEventListener('click', function() {
            const bookingCard = this.closest('.glass-card')
            const roomName = bookingCard?.querySelector('h3')?.textContent || 'Booking'
            const amount = bookingCard?.querySelector('.text-xl')?.textContent || ''
            if (confirm(`Cancel booking for ${roomName}?\n\nRefund amount: ${amount}\n\nCancellation policy: Free cancellation up to 24 hours before check-in.`)) {
              showNotification('Processing cancellation...', 'info')
              setTimeout(() => {
                showNotification(`Booking for ${roomName} has been cancelled. Refund will be processed within 5-7 business days.`, 'success')
                bookingCard.style.opacity = '0.5'
                const statusBadge = bookingCard.querySelector('span')
                if (statusBadge) {
                  statusBadge.textContent = 'Cancelled'
                  statusBadge.className = 'px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400'
                }
                this.disabled = true
                this.style.opacity = '0.5'
              }, 1500)
            }
          })
        }
      }
    })

    // Transaction History Filter
    document.querySelectorAll('select').forEach(select => {
      const parent = select.closest('.glass-card')
      if (parent && parent.querySelector('h2')?.textContent.includes('Transaction') && !processedElements.has(select)) {
        processedElements.add(select)
        select.addEventListener('change', function() {
          const period = this.value
          showNotification(`Filtering transactions for: ${period}`, 'info')
          // In a real app, this would filter the transaction list
        })
      }
    })

    // Quick Actions
    document.querySelectorAll('a[href="#"]').forEach(link => {
      if (processedElements.has(link)) return
      const actionText = link.textContent.trim()
      const parentText = link.closest('.glass-card')?.textContent || ''
      
      if (parentText.includes('Edit Profile') || link.textContent.includes('Edit Profile')) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showModal('Edit Profile', 'Profile editing form would appear here. You can update your name, email, phone number, and preferences.')
        })
      } else if (parentText.includes('Change Password') || link.textContent.includes('Change Password')) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showModal('Change Password', 'Password change form would appear here. Enter your current password and new password.')
        })
      } else if (parentText.includes('Preferences') || link.textContent.includes('Preferences')) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showModal('Notification Preferences', 'Manage your email and SMS notification preferences for bookings, promotions, and updates.')
        })
      } else if (parentText.includes('Download Invoice') || link.textContent.includes('Download Invoice')) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showNotification('Generating invoice...', 'info')
          setTimeout(() => {
            showNotification('Invoice downloaded successfully!', 'success')
          }, 1000)
        })
      }
    })

    // Booking History View Buttons
    document.querySelectorAll('table button').forEach(btn => {
      if (btn.textContent.trim() === 'View' && !processedElements.has(btn)) {
        const table = btn.closest('table')
        if (table && table.querySelector('th')?.textContent.includes('Room')) {
          processedElements.add(btn)
          btn.addEventListener('click', function() {
            const row = this.closest('tr')
            const roomName = row.querySelector('td .font-medium')?.textContent || 'Unknown'
            const bookingId = row.querySelector('td .text-xs')?.textContent || ''
            showModal('Booking Details', `Viewing booking details for ${roomName}. ${bookingId ? bookingId : ''} Full booking information, payment status, and guest preferences would be displayed here.`)
          })
        }
      }
    })

    // View All Links
    document.querySelectorAll('a.text-sm.nav-link, a.nav-link').forEach(link => {
      if (link.textContent.includes('View All') && !processedElements.has(link)) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showNotification('Loading all items...', 'info')
          // In a real app, this would load more items
        })
      }
    })

    // Transaction History Items - Make clickable
    document.querySelectorAll('.glass-card.rounded-xl').forEach(card => {
      if (card.querySelector('.font-medium')?.textContent.includes('Booking') && 
          !processedElements.has(card) &&
          card.closest('section')?.querySelector('h2')?.textContent.includes('Transaction')) {
        processedElements.add(card)
        card.style.cursor = 'pointer'
        card.addEventListener('click', function() {
          const transactionName = this.querySelector('.font-medium')?.textContent || 'Transaction'
          const amount = this.querySelector('.font-semibold')?.textContent || ''
          showModal('Transaction Details', `Transaction: ${transactionName}\nAmount: ${amount}\nFull transaction details, receipt, and payment method would be displayed here.`)
        })
      }
    })

    // Newsletter Subscribe
    const newsletterForm = document.querySelector('footer form')
    if (newsletterForm && !processedElements.has(newsletterForm)) {
      processedElements.add(newsletterForm)
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = newsletterForm.querySelector('input[type="email"]')?.value
        if (email) {
          showNotification('Successfully subscribed to newsletter!', 'success')
          newsletterForm.reset()
        }
      })
    }
  }

  // Admin Dashboard Functions
  function initAdminDashboard() {
    // Export Data Button
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'Export Data' && !processedElements.has(btn)) {
        processedElements.add(btn)
        btn.addEventListener('click', function() {
          showNotification('Exporting data...', 'info')
          setTimeout(() => {
            showNotification('Data exported successfully! Download will start shortly.', 'success')
            // Simulate download
            const link = document.createElement('a')
            link.href = 'data:text/csv;charset=utf-8,Booking ID,Date,Amount\nBK001,2025-03-15,$567'
            link.download = 'hotel-data-export.csv'
            link.click()
          }, 1500)
        })
      }
    })

    // New Booking Button
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'New Booking' && !processedElements.has(btn)) {
        processedElements.add(btn)
        btn.addEventListener('click', function() {
          if (confirm('Create a new booking? You will be redirected to the booking form.')) {
            window.location.href = 'rooms.html'
          }
        })
      }
    })

    // Revenue Chart Filter
    document.querySelectorAll('select').forEach(select => {
      const parent = select.closest('.glass-card')
      if (parent && parent.querySelector('h2')?.textContent.includes('Revenue') && !processedElements.has(select)) {
        processedElements.add(select)
        select.addEventListener('change', function() {
          const period = this.value
          showNotification(`Loading revenue data for: ${period}`, 'info')
          // In a real app, this would update the chart
        })
      }
    })

    // Quick Actions
    document.querySelectorAll('a').forEach(link => {
      if (processedElements.has(link)) return
      const actionText = link.textContent.trim()
      const parentText = link.closest('.glass-card')?.textContent || ''
      
      if (actionText === 'Add New Room' || parentText.includes('Add New Room')) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          if (confirm('Add a new room? You will be redirected to the room management page.')) {
            window.location.href = 'rooms.html'
          }
        })
      } else if (actionText === 'Generate Report' || parentText.includes('Generate Report')) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showNotification('Generating report...', 'info')
          setTimeout(() => {
            showNotification('Report generated successfully!', 'success')
          }, 2000)
        })
      } else if (actionText === 'View Messages' || parentText.includes('View Messages')) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showModal('Messages', 'You have 12 unread messages. This would show the message inbox with guest inquiries and support requests.')
        })
      } else if (actionText === 'Settings' || parentText.includes('Settings')) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showModal('System Settings', 'Full system settings panel would appear here with all configuration options.')
        })
      }
    })

    // Recent Bookings View Buttons
    document.querySelectorAll('table button').forEach(btn => {
      if (btn.textContent.trim() === 'View' && !processedElements.has(btn)) {
        const table = btn.closest('table')
        if (table && table.querySelector('th')?.textContent.includes('Guest')) {
          processedElements.add(btn)
          btn.addEventListener('click', function() {
            const row = this.closest('tr')
            const guestName = row.querySelector('td .font-medium')?.textContent || 'Guest'
            showModal('Booking Details', `Viewing booking details for ${guestName}. Full booking information, payment status, and guest preferences would be displayed here.`)
          })
        }
      }
      // Cancel booking in admin view
      if (btn.textContent.trim() === 'Cancel' && !processedElements.has(btn)) {
        const table = btn.closest('table')
        if (table && table.querySelector('th')?.textContent.includes('Guest')) {
          processedElements.add(btn)
          btn.addEventListener('click', function() {
            const row = this.closest('tr')
            const guestName = row.querySelector('td .font-medium')?.textContent || 'Guest'
            const roomName = row.querySelectorAll('td')[1]?.textContent || 'Room'
            if (confirm(`Cancel booking for ${guestName} (${roomName})?\n\nThis action cannot be undone.`)) {
              showNotification('Processing cancellation...', 'info')
              setTimeout(() => {
                showNotification(`Booking cancelled for ${guestName}`, 'success')
                const statusCell = row.querySelectorAll('td')[4]
                if (statusCell) {
                  statusCell.innerHTML = '<span class="px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400">Cancelled</span>'
                }
                btn.disabled = true
                btn.style.opacity = '0.5'
              }, 1500)
            }
          })
        }
      }
    })

    // Check In Buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'Check In' && !processedElements.has(btn)) {
        processedElements.add(btn)
        btn.addEventListener('click', function() {
          const checkInCard = this.closest('.glass-card')
          const roomInfo = checkInCard?.querySelector('.font-medium')?.textContent || 'Room'
          if (confirm(`Check in guest for ${roomInfo}?`)) {
            showNotification(`Successfully checked in for ${roomInfo}`, 'success')
            this.textContent = 'Checked In'
            this.classList.remove('neo-btn')
            this.classList.add('glass-card')
            this.disabled = true
          }
        })
      }
    })

    // Upcoming Check-ins View Buttons
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'View' && !processedElements.has(btn)) {
        const checkInSection = btn.closest('section')
        if (checkInSection && checkInSection.querySelector('h2')?.textContent.includes('Check-in')) {
          processedElements.add(btn)
          btn.addEventListener('click', function() {
            const checkInCard = this.closest('.glass-card')
            const roomInfo = checkInCard?.querySelector('.font-medium')?.textContent || 'Room'
            showModal('Check-in Details', `Viewing check-in details for ${roomInfo}. Guest information, special requests, and arrival time would be displayed here.`)
          })
        }
      }
    })

    // User Management
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'Add User' && !processedElements.has(btn)) {
        processedElements.add(btn)
        btn.addEventListener('click', function() {
          showModal('Add New User', 'User creation form would appear here. Enter user details, assign role (Admin, Staff, or Guest), and set permissions.')
        })
      }
      if (btn.textContent.trim() === 'Edit' && !processedElements.has(btn)) {
        const table = btn.closest('table')
        if (table && table.querySelector('th')?.textContent.includes('User')) {
          processedElements.add(btn)
          btn.addEventListener('click', function() {
            const row = this.closest('tr')
            const userName = row.querySelector('td .font-medium')?.textContent || 'User'
            showModal('Edit User', `Editing user: ${userName}. Modify user details, role, status, and permissions.`)
          })
        }
      }
    })

    // System Settings Toggles
    document.querySelectorAll('input[type="checkbox"]').forEach(toggle => {
      if (!processedElements.has(toggle)) {
        processedElements.add(toggle)
        toggle.addEventListener('change', function() {
          const settingCard = this.closest('.glass-card')
          const settingName = settingCard?.querySelector('.font-medium')?.textContent || 'Setting'
          const status = this.checked ? 'enabled' : 'disabled'
          showNotification(`${settingName} ${status}`, 'success')
        })
      }
    })

    // Make revenue chart bars more interactive
    document.querySelectorAll('.group.cursor-pointer').forEach(bar => {
      if (bar.closest('.glass-card')?.querySelector('h2')?.textContent.includes('Revenue') && 
          !processedElements.has(bar)) {
        processedElements.add(bar)
        bar.addEventListener('click', function() {
          const day = this.querySelector('span')?.textContent || 'Day'
          const amount = this.querySelectorAll('span')[1]?.textContent || ''
          showModal(`Revenue - ${day}`, `Revenue for ${day}: ${amount}\nDetailed breakdown of bookings, room types, and revenue sources would be displayed here.`)
        })
      }
    })

    // Backup Now Button
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.trim() === 'Backup Now' && !processedElements.has(btn)) {
        processedElements.add(btn)
        btn.addEventListener('click', function() {
          const self = this
          showNotification('Starting backup process...', 'info')
          setTimeout(() => {
            showNotification('Backup completed successfully!', 'success')
            const backupCard = self.closest('.glass-card')
            const lastBackup = backupCard?.querySelector('.text-xs')
            if (lastBackup) {
              lastBackup.textContent = `Last backup: Just now`
            }
          }, 2000)
        })
      }
    })

    // Admin Tools
    document.querySelectorAll('a[href="#"]').forEach(link => {
      if (processedElements.has(link)) return
      const actionText = link.textContent.trim()
      const parentText = link.closest('.glass-card')?.textContent || ''
      
      if (actionText === 'System Logs' || parentText.includes('System Logs')) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showModal('System Logs', 'System activity logs would be displayed here showing all system events, errors, and user actions.')
        })
      } else if (actionText === 'Security Settings' || parentText.includes('Security Settings')) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showModal('Security Settings', 'Manage access controls, password policies, two-factor authentication, and security monitoring.')
        })
      } else if (actionText === 'Database Management' || parentText.includes('Database Management')) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showNotification('Opening database management interface...', 'info')
          setTimeout(() => {
            showModal('Database Management', 'Database management tools would appear here. Export/import data, run queries, and manage backups.')
          }, 500)
        })
      } else if (actionText === 'Analytics & Reports' || parentText.includes('Analytics')) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showModal('Analytics & Reports', 'Generate detailed reports on bookings, revenue, guest satisfaction, and operational metrics.')
        })
      }
    })

    // View All Links
    document.querySelectorAll('a.text-sm.nav-link, a.nav-link').forEach(link => {
      if (link.textContent.includes('View All') && !processedElements.has(link)) {
        processedElements.add(link)
        link.addEventListener('click', (e) => {
          e.preventDefault()
          showNotification('Loading all items...', 'info')
        })
      }
    })
  }

  // Modal Functions
  function showModal(title, content) {
    // Remove existing modal if any
    const existingModal = document.getElementById('dashboard-modal')
    if (existingModal) {
      existingModal.remove()
    }

    const modal = document.createElement('div')
    modal.id = 'dashboard-modal'
    modal.className = 'fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'
    modal.innerHTML = `
      <div class="glass-card rounded-2xl p-6 max-w-md w-full relative">
        <button class="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100" id="close-modal">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h3 class="text-2xl font-semibold mb-4">${title}</h3>
        <p class="text-neutral-600 dark:text-neutral-300 mb-6">${content}</p>
        <div class="flex gap-3 justify-end">
          <button class="glass-card px-4 py-2 rounded-full text-sm font-medium card-hover" id="modal-cancel">Close</button>
          <button class="neo-btn px-4 py-2 rounded-full text-sm font-medium" id="modal-confirm">OK</button>
        </div>
      </div>
    `
    document.body.appendChild(modal)

    const closeModal = () => modal.remove()
    modal.querySelector('#close-modal').addEventListener('click', closeModal)
    modal.querySelector('#modal-cancel').addEventListener('click', closeModal)
    modal.querySelector('#modal-confirm').addEventListener('click', closeModal)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal()
    })
  }

  // Notification Function
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div')
    notification.className = `fixed top-4 right-4 z-[200] glass-card rounded-xl p-4 shadow-lg max-w-sm animate-slide-in`
    const colors = {
      success: 'text-green-600 dark:text-green-400',
      error: 'text-red-600 dark:text-red-400',
      info: 'text-blue-600 dark:text-blue-400',
      warning: 'text-yellow-600 dark:text-yellow-400'
    }
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <div class="h-8 w-8 rounded-lg ${colors[type] || colors.info} bg-${type === 'success' ? 'green' : type === 'error' ? 'red' : type === 'warning' ? 'yellow' : 'blue'}-500/10 flex items-center justify-center">
          ${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'}
        </div>
        <div class="flex-1">
          <div class="font-medium text-sm">${message}</div>
        </div>
        <button class="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100" id="close-notification">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `
    document.body.appendChild(notification)

    notification.querySelector('#close-notification').addEventListener('click', () => notification.remove())
    setTimeout(() => notification.remove(), 5000)
  }

  // Add CSS for animations
  if (!document.getElementById('dashboard-styles')) {
    const style = document.createElement('style')
    style.id = 'dashboard-styles'
    style.textContent = `
      @keyframes slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .animate-slide-in {
        animation: slide-in 0.3s ease-out;
      }
    `
    document.head.appendChild(style)
  }

  // Sidebar Navigation Functions
  function initSidebar() {
    const sidebar = document.getElementById('sidebar')
    const sidebarToggle = document.getElementById('sidebar-toggle')
    const sidebarOverlay = document.getElementById('sidebar-overlay')

    if (!sidebar || !sidebarToggle) return

    const openSidebar = () => {
      sidebar.classList.remove('-translate-x-full')
      if (sidebarOverlay) {
        sidebarOverlay.classList.remove('hidden')
      }
      document.body.style.overflow = 'hidden'
    }

    const closeSidebar = () => {
      sidebar.classList.add('-translate-x-full')
      if (sidebarOverlay) {
        sidebarOverlay.classList.add('hidden')
      }
      document.body.style.overflow = ''
    }

    // Toggle sidebar
    sidebarToggle.addEventListener('click', () => {
      if (sidebar.classList.contains('-translate-x-full')) {
        openSidebar()
      } else {
        closeSidebar()
      }
    })

    // Close sidebar when clicking overlay
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', closeSidebar)
    }

    // Close sidebar when clicking a link (mobile only)
    const sidebarLinks = sidebar.querySelectorAll('a')
    sidebarLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
          closeSidebar()
        }
      })
    })

    // Close sidebar on window resize if desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        closeSidebar()
      }
    })

    // Handle escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !sidebar.classList.contains('-translate-x-full')) {
        closeSidebar()
      }
    })
  }

  // Initialize when DOM is ready
  function initDashboards() {
    // Initialize sidebar navigation
    initSidebar()

    // Check for specific elements to determine which dashboard
    const h1 = document.querySelector('h1')
    const pageTitle = document.title.toLowerCase()
    const pathname = window.location.pathname.toLowerCase()

    if (h1?.textContent.includes('Welcome back') || 
        pageTitle.includes('user dashboard') || 
        pageTitle.includes('my dashboard') ||
        pathname.includes('user-dashboard')) {
      initUserDashboard()
    }
    
    if (h1?.textContent.includes('Admin Dashboard') || 
        pageTitle.includes('admin dashboard') ||
        pathname.includes('admin-dashboard')) {
      initAdminDashboard()
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboards)
  } else {
    initDashboards()
  }
})()

