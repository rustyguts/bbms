import { TbRoute } from 'react-icons/tb'
import { IconButton } from '@chakra-ui/react'
import { useMapStore } from '../../config/mapStore'

export default function RoutesToggle() {
  const { routesVisible, toggleRoutesVisible } = useMapStore()

  return (
    <IconButton
      size="lg"
      icon={<TbRoute />}
      aria-label="Routes"
      onClick={toggleRoutesVisible}
      variant={routesVisible ? 'solid' : 'outline'}
    />
  )
}
