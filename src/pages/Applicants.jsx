import { useState } from 'react'
import Layout from '../components/Layout'
import PixelButton from '../components/PixelButton'
import FormSelect from '../components/FormSelect'
import { getSubmitErrorMessage } from '../lib/formErrors'
import { submitApplication } from '../services/applications'

// ─── Default form state ───────────────────────────────────────

const defaultForm = {
  full_name: '',
  age: '',
  phone_number: '',
  email: '',
  gender: '',
  preferred_study_destination: 'UK',
  other_countries_interested: '',
  program_interested: 'Undergraduate',
  intake_period: '2026 intake',
  highest_qualification: "Bachelor's degree",
  other_qualification: '',
  previous_visa_refusal: 'No',
  referral_source: 'A friend',
}

// ─── Page ────────────────────────────────────────────────────

export default function Applicants() {
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
      await submitApplication(form, 'applicants')
      setSubmitted(true)
    } catch (err) {
      setError(getSubmitErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Layout>
      <main>
        <article className="shell py-16 md:py-24">
          <div className="max-w-3xl mx-auto lg:px-16 lg:py-16">

            {/* Headings */}
            <h1 className="font-inter font-bold text-[28px] lg:text-[48px] leading-[32px] lg:uppercase mb-6 lg:mb-8 text-brand-800 tracking-[0%] lg:tracking-[2px] text-center">
              Application Segment
            </h1>
            <h2 className="font-inter font-semibold text-[24px] leading-[32px] mb-6 text-[#181E22] tracking-[3px] text-center">
              Start your study abroad journey here
            </h2>

            {/* ── Success state ── */}
            {submitted ? (
              <div className="mt-12 flex flex-col items-center justify-center py-20 text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#16484b]/10 mb-6">
                  <i className="fa-solid fa-check text-3xl text-[#16484b]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900">Application Submitted!</h3>
                <p className="mt-3 text-slate-500 max-w-sm">
                  Thank you for applying. Our team will review your application and get in touch within 24–48 hours.
                </p>
              </div>
            ) : (

              /* ── Form ── */
              <form
                onSubmit={handleSubmit}
                className="mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 px-4 sm:px-6 lg:px-8"
              >
                {/* Full name */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Full Name*</label>
                  <input
                    name="full_name"
                    type="text"
                    value={form.full_name}
                    onChange={handleChange}
                    className="form-field"
                    placeholder="Your full name"
                    required
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Age*</label>
                  <input
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    className="form-field"
                    placeholder="19"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Phone Number*</label>
                  <input
                    name="phone_number"
                    type="tel"
                    value={form.phone_number}
                    onChange={handleChange}
                    className="form-field"
                    placeholder="+234 800 000 0000"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Email*</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-field"
                    placeholder="Email"
                    required
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Gender*</label>
                  <FormSelect name="gender" value={form.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </FormSelect>
                </div>

                {/* Preferred destination */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Preferred study destination*</label>
                  <FormSelect name="preferred_study_destination" value={form.preferred_study_destination} onChange={handleChange} required>
                    {['UK', 'Canada', 'Ireland', 'Australia', 'USA'].map(d => (
                      <option key={d}>{d}</option>
                    ))}
                  </FormSelect>
                </div>

                {/* Other countries */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Other countr(ies) interested in*</label>
                  <input
                    name="other_countries_interested"
                    type="text"
                    value={form.other_countries_interested}
                    onChange={handleChange}
                    className="form-field"
                    placeholder="Optional"
                  />
                </div>

                {/* Program */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Program interested in?*</label>
                  <FormSelect name="program_interested" value={form.program_interested} onChange={handleChange} required>
                    {['A Levels', 'Foundation', 'Undergraduate', 'Postgraduate'].map(p => (
                      <option key={p}>{p}</option>
                    ))}
                  </FormSelect>
                </div>

                {/* Intake period */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Other programme interested in?*</label>
                  <FormSelect name="intake_period" value={form.intake_period} onChange={handleChange} required>
                    {['2026 intake', '2027 intake', 'Not sure yet'].map(i => (
                      <option key={i}>{i}</option>
                    ))}
                  </FormSelect>
                </div>

                {/* Highest qualification */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Highest qualification?*</label>
                  <FormSelect name="highest_qualification" value={form.highest_qualification} onChange={handleChange} required>
                    {['SSCE', 'OND', 'HND', "Bachelor's degree"].map(q => (
                      <option key={q}>{q}</option>
                    ))}
                  </FormSelect>
                </div>

                {/* Other qualification */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Other qualification*</label>
                  <input
                    name="other_qualification"
                    type="text"
                    value={form.other_qualification}
                    onChange={handleChange}
                    className="form-field"
                    placeholder="Optional"
                  />
                </div>

                {/* Visa refusal */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">Any previous visa refusal?*</label>
                  <FormSelect name="previous_visa_refusal" value={form.previous_visa_refusal} onChange={handleChange} required>
                    <option>No</option>
                    <option>Yes</option>
                  </FormSelect>
                </div>

                {/* Referral source */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-800">How did you hear about us?*</label>
                  <FormSelect name="referral_source" value={form.referral_source} onChange={handleChange} required>
                    {['A friend', 'Instagram', 'Referral partner', 'Google search'].map(s => (
                      <option key={s}>{s}</option>
                    ))}
                  </FormSelect>
                </div>

                {error ? (
                  <p className="sm:col-span-2 text-sm text-red-600" role="alert">{error}</p>
                ) : null}

                {/* Submit */}
                <div className="sm:col-span-2 pt-3 mx-auto">
                  <PixelButton
                    as="button"
                    type="submit"
                    variant="secondary-applicants"
                    label={submitting ? 'Submitting…' : 'Submit Application'}
                    className="px-3 rounded-[5px] pxbtn--arrow-lg"
                    disabled={submitting}
                  />
                </div>

              </form>
            )}

          </div>
        </article>
      </main>
    </Layout>
  )
}
