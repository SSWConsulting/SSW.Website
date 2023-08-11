interface SVGBadgeProps
  extends Omit<SVGAttributes<SVGCircleElement>, "name">,
    BadgeProps {
  size?: number;
  cx: number;
  cy: number;
  rotate?: number;
}

interface DivBadgeProps extends BadgeProps {
  size?: number;
  x: number;
  y: number;
  rotate?: number;
}

interface BadgeProps {
  name?: string;
  imgURL?: string;
  largeIcon?: boolean;
  fill?: string;
  duration?: number;
  bounceDown?: boolean;
}
