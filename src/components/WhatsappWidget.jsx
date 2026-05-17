import OptimizedImage from './OptimizedImage'

const WHATSAPP_URL = `https://wa.me/2349133071334`

export default function WhatsappWidget() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with StudyGlide on WhatsApp"
      className="fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1bd741] p-2.5 shadow-lg transition-transform hover:scale-110 active:scale-95"
    >
      <OptimizedImage
        src="/whatsapp.png"
        alt=""
        decorative
        className="h-full w-full object-contain"
      />
    </a>
  )
}
