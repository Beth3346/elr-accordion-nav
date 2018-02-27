import $ from 'jquery'
import accordionNav from '../elr-accordion-nav'
import fs from 'fs'
import path from 'path'

const accordionHtml = path.join(__dirname, '..', 'accordion-nav.html')
const html = fs.readFileSync(accordionHtml).toString()

beforeEach(() => {
  document.body.innerHTML = html
  jsdom.reconfigure({
    url: 'http://localhost:8000/pages/dogs#shetland-sheepdog'
  })

  accordionNav.init()
})

describe('init', () => {
  it('should add active class when label is clicked', () => {
    $('.elr-accordion-menu-label')
      .eq(2)
      .click()

    expect(
      $('.elr-accordion-menu-label')
        .eq(2)
        .hasClass('active')
    ).toBeTruthy()
    expect(
      $('.elr-accordion-menu-inner')
        .eq(2)
        .hasClass('active')
    ).toBeTruthy()
  })
  it('should remove active class when active label is clicked', () => {
    $('.elr-accordion-menu-label')
      .eq(2)
      .click()

    expect(
      $('.elr-accordion-menu-label')
        .eq(2)
        .hasClass('active')
    ).toBeTruthy()
    expect(
      $('.elr-accordion-menu-inner')
        .eq(2)
        .hasClass('active')
    ).toBeTruthy()

    $('.elr-accordion-menu-label')
      .eq(2)
      .click()

    expect(
      $('.elr-accordion-menu-label')
        .eq(2)
        .hasClass('active')
    ).toBeFalsy()
    expect(
      $('.elr-accordion-menu-inner')
        .eq(2)
        .hasClass('active')
    ).toBeFalsy()
  })
  it('should only have one menu visible', () => {
    $('.elr-accordion-menu-label')
      .eq(2)
      .click()

    expect($('.elr-accordion-menu-label.active').length).toBe(1)
    expect($('.elr-accordion-menu-inner.active').length).toBe(1)
  })
  it('should open menu related to active page', () => {
    expect(
      $('.elr-accordion-menu-label')
        .eq(1)
        .hasClass('active')
    ).toBeTruthy()
    expect(
      $('.elr-accordion-menu-inner')
        .eq(1)
        .hasClass('active')
    ).toBeTruthy()
    expect(
      $('.elr-accordion-menu-inner')
        .eq(1)
        .children()
        .eq(1)
        .hasClass('active')
    ).toBeTruthy()

    expect($('.elr-accordion-menu-label.active').length).toBe(1)
    expect($('.elr-accordion-menu-inner.active').length).toBe(1)
  })
  it('should update menu when hash changes', () => {})
})
