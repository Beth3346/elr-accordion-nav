import $ from 'jquery'
import accordionNav from '../elr-accordion-nav'
import fs from 'fs'
import path from 'path'

const accordionHtml = path.join(__dirname, '..', 'accordion-nav.html')
const html = fs.readFileSync(accordionHtml).toString()

beforeEach(() => {
  document.body.innerHTML = html
  jsdom.reconfigure({
    url: "http://localhost:8000/pages/dogs#shetland-sheepdogs"
  })

  accordionNav.init()
})

describe('init', () => {
  it('should add active class when label is clicked', () => {
    $('.elr-accordion-menu-label').eq(2).click()

    expect($('.elr-accordion-menu-label').eq(2).hasClass('active')).toBeTruthy()
    expect($('.elr-accordion-menu-inner').eq(2).hasClass('active')).toBeTruthy()
  })
  it('should remove active class when active label is clicked', () => {
    $('.elr-accordion-menu-label').eq(2).click()

    expect($('.elr-accordion-menu-label').eq(2).hasClass('active')).toBeTruthy()
    expect($('.elr-accordion-menu-inner').eq(2).hasClass('active')).toBeTruthy()

    $('.elr-accordion-menu-label').eq(2).click()

    expect($('.elr-accordion-menu-label').eq(2).hasClass('active')).toBeFalsy()
    expect($('.elr-accordion-menu-inner').eq(2).hasClass('active')).toBeFalsy()
  })
  it('should only have one menu visible', () => {
    $('.elr-accordion-menu-label').eq(2).click()

    expect($('.elr-accordion-menu-label.active').length).toBe(1)
    expect($('.elr-accordion-menu-inner.active').length).toBe(1)
  })
  it('should open menu related to active page', () => {
    expect($('.elr-accordion-menu-label').eq(1).hasClass('active')).toBeTruthy()
    expect($('.elr-accordion-menu-inner').eq(1).hasClass('active')).toBeTruthy()

    expect($('.elr-accordion-menu-label.active').length).toBe(1)
    expect($('.elr-accordion-menu-inner.active').length).toBe(1)
  })
})
describe('trimPath', () => {
  it('should remove last slash from a path', () => {
    expect(accordionNav.trimPath('/dogs/')).toBe('/dogs')
  })
})
describe('getStartIndex', () => {
  it('should find index of / in path', () => {
    expect(accordionNav.getStartIndex('http://elizabeth-rogers.com/pages/dogs'))
      .toBe(33)
  })
})
describe('getCurrentPage', () => {
  it('should get the current page', () => {
    expect(accordionNav.getCurrentPage('http://elizabeth-rogers.com/pages/dogs/'))
      .toBe('/dogs')
  })
  it('should keep the hash', () => {
    expect(accordionNav.getCurrentPage('http://elizabeth-rogers.com/pages/dogs#yorkies'))
      .toBe('/dogs#yorkies')
  })
})
describe('getTargetListItem', () => {
  it('should find the target list item', () => {
    accordionNav.getTargetListItem('/dogs')

    expect($('.elr-accordion-menu-label').eq(1).hasClass('active')).toBeTruthy()
  })
})
describe('getCurrentList', () => {
  it('should find the current list', () => {
    accordionNav.getCurrentList('/dogs')

    expect($('.elr-accordion-menu-inner').eq(1).hasClass('active')).toBeTruthy()
  })
})
