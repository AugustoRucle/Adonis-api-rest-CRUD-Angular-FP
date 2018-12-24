'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contacts
 */

const Contact = use('App/Models/Contact');

class ContactController {
  /**
   * Show a list of all contacts.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    let contacts = await Contact.query().with('user').fetch()
    return response.json(contacts)
  }

  /**
   * Create/save a new contact.
   * POST contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const name = request.input('name')
    const email = request.input('email')
    const title = request.input('title')
    const tel = request.input('tel')

    const contact = new Contact()
    contact.name = name
    contact.email = email
    contact.title = title
    contact.tel = tel

    await contact.save()
    return response.json(contact)
  }

  /**
   * Update contact details.
   * PUT or PATCH contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const name = request.input('name')
    const email = request.input('email')
    const title = request.input('title')
    const tel = request.input('tel')

    let contact = await Contact.find(params.id)

    contact.name = name
    contact.email = email
    contact.title = title
    contact.tel = tel
    await contact.save()
    return response.json(contact)
  }

  /**
   * Delete a contact with id.
   * DELETE contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    await Contact.find(params.id).delete()
    return response.json({message: 'Contact deleted!'})
  }
}

module.exports = ContactController
