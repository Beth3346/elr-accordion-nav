import $ from 'jquery'

const trimPath = pathname => {
  if (pathname && pathname.length) {
    if (pathname.lastIndexOf('/') === pathname.length - 1) {
      return pathname.slice(0, -1)
    }
  }

  return pathname
}

const getStartIndex = pathname => {
  if (pathname && pathname.length) {
    return pathname.lastIndexOf('/')
  }
}

const getCurrentPage = pathname => {
  const trimmedPath = trimPath(pathname)
  const startIndex = getStartIndex(trimmedPath)

  if (trimmedPath && trimmedPath.length) {
    return trimmedPath.slice(startIndex)
  }
}

const getTargetListItem = pathname => {
  const currentPage = getCurrentPage(pathname)
  const $target = $(`a[href$="${currentPage}"]`)

  if ($target.length) {
    return $target.addClass('active')
  }

  return false
}

const getCurrentList = (pathname, hash) => {
  const $target = getTargetListItem(pathname)

  if ($target.length) {
    $target
      .next('ul')
      .addClass('active')
      .parent('li')

    if (hash) {
      $(`a[href$="#${hash.slice(1)}"]`)
        .parent('li')
        .addClass('active')
    }

    return $target
  }

  return false
}

const toggle = function($openContent, $openLabel) {
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

      const $currentList = getCurrentList(
        window.location.pathname,
        window.location.hash
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
