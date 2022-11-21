import { forwardRef } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

interface NextLinkComposedProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<
      NextLinkProps,
      'href' | 'as' | 'onClick' | 'onMouseEnter' | 'onTouchStart'
    > {
  to: NextLinkProps['href'];
  linkAs?: NextLinkProps['as'];
}

const NextLinkAnchor = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
  function NextLinkAnchorFunc(props, ref) {
    const {
      to,
      linkAs,
      replace,
      scroll,
      shallow,
      prefetch = false,
      locale,
      ...attributes
    } = props;

    return (
      <NextLink
        href={to}
        prefetch={prefetch}
        as={linkAs}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        passHref
        locale={locale}
      >
        <a style={{ textDecoration: 'none' }} ref={ref} {...attributes} />
      </NextLink>
    );
  }
);

export default NextLinkAnchor;
