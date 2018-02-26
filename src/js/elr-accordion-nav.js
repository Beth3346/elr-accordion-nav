import $ from 'jquery'

// const showCurrent = function ($currentList = null) {
//   if ($currentList) {
//     $container.find('ul.active').removeClass('active')
//     $currentList.parent('ul').addClass('active')

//     return $currentList
//   }

//   return
// }

const toggle = function ($openContent, $openLabel) {
  const $that = $(this)
  const $nextContent = $that.next('ul')

  if (!$nextContent.hasClass('active')) {
    $that.addClass('active')
    $nextContent.addClass('active')
  }

  $openLabel.removeClass('active')
  $openContent.removeClass('active')
}

let $container

export default {
  trimPath(pathname) {
    if (pathname && pathname.length) {
      if (pathname.lastIndexOf('/') === pathname.length - 1) {
        return pathname.slice(0, -1)
      }
    }

    return pathname
  },
  getStartIndex(pathname) {
    if (pathname && pathname.length) {
      return pathname.lastIndexOf('/')
    }
  },
  getCurrentPage(pathname, hash) {
    const trimmedPath = this.trimPath(pathname)
    const startIndex = this.getStartIndex(trimmedPath)

    if (hash) {
      return `${trimmedPath.slice(startIndex)}${hash}`
    }

    if (trimmedPath && trimmedPath.length) {
      return trimmedPath.slice(startIndex)
    }
  },
  getTargetListItem(pathname) {
    const currentPage = this.getCurrentPage(pathname)
    const $target = $(`a[href$="${currentPage}"]`)

    if ($target.length) {
      return $target.addClass('active')
    }

    return false
  },
  getCurrentList(pathname, hash) {
    const $target = this.getTargetListItem(pathname, hash)

    if ($target.length) {
      return $target.next('ul').addClass('active').parent('li')
    }

    return false
  },
  init() {
    $container = $(`.elr-accordion-menu`)

    if ($container.length) {
      const $label = $container
        .find(`.elr-accordion-menu-label`)
        .parent('li')
        .has('ul')
        .children('a')
      const $content = $label.next('ul')
      const $openContent = $content.filter('.active')
      const $openLabel = $label.filter('.active')

      const $currentList = this.getCurrentList(
        window.location.pathname
      )

      if ($currentList) {
        $openContent.removeClass('active')
        $openLabel.removeClass('active')
      }

      // $(window).on('hashchange', function() {
      //   $container.find('a.active').removeClass('active')

      //   $content.removeClass('active')

      //   showCurrent(
      //     getCurrentList(window.location.pathname, window.location.hash)
      //   )
      // })

      $label.on('click', function(e) {
        e.preventDefault()

        const $currentContent = $content.filter('.active')
        const $currentLabel = $label.filter('.active')

        toggle.call(this, $currentContent, $currentLabel)
      })
    }
  }
}
