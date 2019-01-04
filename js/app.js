function animate() {
   $('.animate').each(function(index){
      var i = index
      var element = $(this)
      var a_class = element.data('animate')

      setTimeout(() => {
         element.addClass(a_class)
      }, i * 100)
   })
}

function scrollNav() {
   $(window).on('scroll', () => {
      var scrollTop = $(window).scrollTop()
      var nav = $('nav.clone')

      if (scrollTop > 100) {
         nav.addClass('is-scrolled')
      } else {
         nav.removeClass('is-scrolled')
      }
   })
}

function toggleModal(action) {
   var modal = $('.form-modal-wrapper')
   var backdrop = $('.backdrop')

   if (modal.hasClass('open')) {
      modal.removeClass('open')
      backdrop.removeClass('open')
   } else {
      modal.addClass('open')
      backdrop.addClass('open')
   }

   if (action === 'close') {
      modal.removeClass('open')
      backdrop.removeClass('open')
   }
}

function render(data) {
   data.forEach((item, index) => {
      if (index < 6) {
         var html = $(`
                        <div class="column col-3">
                           <div class="item animate fadeUp" data-animate="fadingUp">
                              <a href="${item.html_url}" target="_blank">
                                 <h4 title="${item.name}">${item.name}</h4>
                                 <p class="sub" title="${item.description}">${item.description}</p>
                                 <div class="github-stats flex align-center">
                                    <p class="flex align-center" title="${item.stargazers_count} stars">
                                       <i class="ion-md-star"></i>
                                       ${item.stargazers_count}
                                    </p>
                                    <p class="flex align-center" title="${item.forks_count} forks">
                                       <i class="ion-md-git-network"></i>
                                       ${item.forks_count}
                                    </p>
                                 </div>
                              </a>
                           </div>
                        </div>
                     `)

         $('body .github-projects .columns').append(html)
      }
   })
}

function getRepos() {
   $.ajax({
      url: 'https://api.github.com/users/hipady/repos',
      success: (res) => {
         $('.intro-logo').removeClass('fadingUp')
         setTimeout(() => {
            $('body').css('overflow', 'initial')
            render(res)
            animate()
         }, 1200)
      }
   })
}

function intro() {
   var logo = $('.intro-logo')

   logo.addClass('fadingUp')

   setTimeout(() => {
      getRepos()
      scrollNav()
   }, 3000)
}


$(document).ready(() => {

   $('body').css('overflow', 'hidden')
   intro()

   $('.open-modal').click(toggleModal)
   $('.close-modal').click(toggleModal)
   $(document).keydown(function(e) {
      console.log(e)
      if (e.keyCode === 27)
         toggleModal('close')
   })

})
