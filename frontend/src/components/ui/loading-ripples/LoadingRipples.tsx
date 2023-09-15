import { Box } from '@chakra-ui/react';
import styles from './LoadingRipples.module.css';

const sizes = {
  "sm": 4,
  "md": 16,
  "lg": 24,
  "xl": 32
}

interface Props {
  color: string;
  size: "sm" | "md" | "lg" | "xl";
}
const LoadingRipples = ({ color, size }: Props) => {
  return <Box className={styles.spinner}>
    <Box bg={color} width={sizes[size]} aspectRatio={'1/1'} className={styles.bounce1}></Box>
    <Box bg={color} width={sizes[size]} aspectRatio={'1/1'} className={styles.bounce2}></Box>
    <Box bg={color} width={sizes[size]} aspectRatio={'1/1'} className={styles.bounce3}></Box>
  </Box>
}

export default LoadingRipples
