import { ComponentProps } from "react";

// Aqui nesse componente estamos criando um 'a' estilizando, mas contendo todas
// as propriedades raiz do componente, usando o ' extends ComponentProps<'a'> '
interface NavLinkProps extends ComponentProps<'a'> {
  children: string;
  href: string;
}

export function NavLink(props: NavLinkProps) {
  return(
    <>
      {/* E aqui adicionamos o {...props}, para de fato ter acesso as propiedades raiz */}
      <a {...props} href={props.href} className='font-medium text-sm text-zinc-300'>
        {props.children}
      </a>
    </>
  )
}