'use client'

import { useState } from 'react'
import Layout from '../components/Layout'
import OptimizedImage from '../components/OptimizedImage'
import PixelButton from '../components/PixelButton'
import { getSubmitErrorMessage } from '../lib/formErrors'
import { submitContactMessage } from '../services/contact'

// ─── Page ────────────────────────────────────────────────────

const defaultForm = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(defaultForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await submitContactMessage(form)
      setSubmitted(true)
    } catch (err) {
      setError(getSubmitErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Layout>

      {/* ── Main ── */}
      <main>
        <div className="shell py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* ── Left — contact info ── */}
            <div className="flex flex-col justify-center">
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#16484b]/10 mb-4">
                    <i className="fa-solid fa-check text-2xl text-[#16484b]" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900">Message Sent!</h3>
                  <p className="mt-2 text-slate-500">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-[30px]! md:text-[36px]! font-semibold text-[#181D27] mb-5">Get in touch</h3>
                  <p className="text-base! lg:text-[20px]! leading-7.5! text-[#535862] mb-5 hidden lg:block">Our friendly team would love to hear from you.</p>
                  <p className="text-base! lg:text-[20px]! leading-7.5! text-[#535862] mb-5 lg:hidden">You can reach us anytime via <span className='text-[#16484B] font-medium!'>Info@studyglideedu.com</span></p>

                  <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">

                    {/* First name | Last name — same side-by-side layout as former email / phone row */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800">First Name *</label>
                      <input
                        name="first_name"
                        type="text"
                        value={form.first_name}
                        onChange={handleChange}
                        className="form-field"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-800">Last Name *</label>
                      <input
                        name="last_name"
                        type="text"
                        value={form.last_name}
                        onChange={handleChange}
                        className="form-field"
                        placeholder="Last name"
                        required
                      />
                    </div>

                    {/* Email — full row, required */}
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-slate-800">Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-field"
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    {/* Phone — full row, optional */}
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-slate-800">Phone Number</label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="form-field"
                        placeholder="+234 800 000 0000"
                      />
                    </div>

                    {/* Message — full row, required */}
                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-semibold text-slate-800">Message *</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        className="form-field"
                        rows={5}
                        placeholder="Tell us about your study plans and how we can help..."
                        required
                      />
                    </div>

                    {error ? (
                      <p className="sm:col-span-2 text-sm text-red-600" role="alert">{error}</p>
                    ) : null}

                    {/* Submit */}
                    <div className="sm:col-span-2 pt-2">
                      <PixelButton
                        as="button"
                        type="submit"
                        variant="secondary"
                        label={submitting ? 'Sending…' : 'Send Message'}
                        className="w-full px-4 rounded-[5px] pxbtn--arrow-lg"
                        disabled={submitting}
                      />
                    </div>

                  </form>
                </>
              )}
            </div>

            {/* ── Right — contact form ── */}
            <OptimizedImage
              src="/Image(12).png"
              alt="StudyGlide consultant meeting with a student"
              className="w-full h-full object-cover hidden lg:block"
            />

          </div>
        </div>
      </main>

    </Layout>
  )
}
