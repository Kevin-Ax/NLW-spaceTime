export default function EmptyMemories() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p className="w-[360px] text-center leading-relaxed">
        Você ainda não criou nenhuma memória, comece a{' '}
        <a
          target="_blank"
          href="/"
          className="underline transition-colors hover:text-gray-50"
        >
          criar agora
        </a>
      </p>
    </div>
  )
}
