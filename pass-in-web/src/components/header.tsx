import nwlUnitIcon from '../assets/nlw-unit-icon.svg'

export function Header() {
  return(
    <>
      <div className='flex items-center gap-5 py-2'>
        <img src={nwlUnitIcon} alt="Icone da nwl unite" />
        <nav className='flex items-center gap-5'>
          <a href='/eventos'>Eventos</a>
          <a href='/participantes'>Participantes</a>
        </nav>
      </div>
    </>
  )
}