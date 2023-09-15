import { Box } from '@chakra-ui/react'
import styles from './LoadingCubes.module.css';

interface Props {
  color: string;
}
const LoadingCubes = ({ color }: Props) => {
  return <Box className={styles["sk-cube-grid"]}>
    <Box bg={color} className={styles["sk-cube sk-cube1"]}></Box>
    <Box bg={color} className={styles["sk-cube sk-cube2"]}></Box>
    <Box bg={color} className={styles["sk-cube sk-cube3"]}></Box>
    <Box bg={color} className={styles["sk-cube sk-cube4"]}></Box>
    <Box bg={color} className={styles["sk-cube sk-cube5"]}></Box>
    <Box bg={color} className={styles["sk-cube sk-cube6"]}></Box>
    <Box bg={color} className={styles["sk-cube sk-cube7"]}></Box>
    <Box bg={color} className={styles["sk-cube sk-cube8"]}></Box>
    <Box bg={color} className={styles["sk-cube sk-cube9"]}></Box>
  </Box>
}

export default LoadingCubes
