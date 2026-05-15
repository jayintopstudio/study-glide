import { useState, useEffect } from 'react'

const WHATSAPP_NUMBER = '+2349133071334'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function ChatBubbleIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.767 5.767 0 1.267.405 2.436 1.087 3.388l-.394 1.44 1.487-.38c.903.522 1.946.823 3.055.823 3.181 0 5.767-2.586 5.767-5.767 0-3.181-2.586-5.767-5.767-5.767zm4.611 8.219c-.062.176-.36.345-.491.375-.13.029-.261.05-.741-.144-.594-.242-1.215-.653-1.788-1.226-.573-.573-.984-1.194-1.226-1.788-.194-.48-.173-.611-.144-.741.03-.131.199-.429.375-.491.176-.062.232-.053.305-.015s.163.153.238.303c.075.15.25.617.272.661.022.044.022.094 0 .138-.022.044-.044.088-.088.138l-.134.131c-.044.044-.094.094-.041.185.053.091.236.391.507.632.348.31.641.406.731.45.091.044.144.037.197-.022.053-.059.226-.263.286-.353.06-.091.12-.075.201-.044.082.031.517.244.607.288.091.044.15.066.172.103.022.037.022.213-.04.389zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.66 1.434 5.168L2 22l4.957-1.301C8.384 21.531 10.121 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  )
}

export default function WhatsappWidget() {
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState('')

  // Show real current time like the original `realTime` element
  useEffect(() => {
    function fmt() {
      const now = new Date()
      let h = now.getHours()
      const m = now.getMinutes().toString().padStart(2, '0')
      const ampm = h >= 12 ? 'PM' : 'AM'
      h = h % 12 || 12
      return `${h}:${m} ${ampm}`
    }
    setTime(fmt())
  }, [])

  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end font-sans">

      {/* ── Pop-up card ── */}
      <div
        className={`mb-4 w-72 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-300 origin-bottom-right ${
          open
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="bg-[#25D366] p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://ui-avatars.com/api/?name=Support&background=white&color=25D366"
                className="h-10 w-10 rounded-full"
                alt="Support avatar"
              />
              <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-[#25D366] bg-emerald-400" />
            </div>
            <div>
              <p className="font-bold text-sm">Customer Support</p>
              <p className="text-xs opacity-90">Typically replies within an hour</p>
            </div>
          </div>
        </div>

        {/* Chat bubble */}
        <div className="bg-[#E5DDD5] p-4">
          <div className="relative rounded-lg bg-white p-3 shadow-sm after:absolute after:-left-2 after:top-2 after:border-8 after:border-transparent after:border-r-white">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Support</p>
            <p className="text-sm text-gray-800">
              Hi there! 👋<br />How can we help you today?
            </p>
            <p className="mt-1 text-right text-[10px] text-gray-400">{time}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white p-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon className="h-5 w-5 fill-current" />
            Start Chat
          </a>
        </div>
      </div>

      {/* ── Toggle button ── */}
      <button
        onClick={() => setOpen(prev => !prev)}
        aria-label={open ? 'Close chat' : 'Open WhatsApp chat'}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 active:scale-95"
      >
        {/* Chat icon — visible when closed */}
        <ChatBubbleIcon
          className={`h-8 w-8 transition-all duration-300 group-hover:rotate-12 ${
            open ? 'opacity-0 scale-50 absolute' : 'opacity-100 scale-100'
          }`}
        />

        {/* Close × — visible when open */}
        <span
          className={`text-2xl font-light leading-none transition-all duration-300 ${
            open ? 'opacity-100 scale-100' : 'opacity-0 scale-50 absolute'
          }`}
        >
          &times;
        </span>
      </button>
    </div>
  )
}
