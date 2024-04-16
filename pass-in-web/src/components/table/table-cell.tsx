import { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge';

interface TableCellProps extends ComponentProps<'td'> {

}

export function TableCell(props: TableCellProps) {
  return(
    <>
      {/* Nesse componente usamos o tailwind-merge para unir as classes de estilização
          Por isso é necessário que o '{...props}' esteja antes do 'className' */}
      <td {...props} className={twMerge("py-3 px-4 text-sm text-zinc-300", props.className)} />
    </>
  )
}