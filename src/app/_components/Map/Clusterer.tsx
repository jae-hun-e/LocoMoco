import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { MapContext } from './Map';

interface ClustererProps {
  minLevel?: number;
  children: ReactNode;
}

export const clustererContext = createContext<kakao.maps.MarkerClusterer | undefined>(undefined);

const Clusterer = ({ minLevel, children }: ClustererProps) => {
  const map = useContext(MapContext);
  const [clusterer, setClusterer] = useState<kakao.maps.MarkerClusterer>();

  useEffect(() => {
    if (map) {
      const clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: minLevel ?? 6, // 클러스터 할 최소 지도 레벨
        disableClickZoom: true, // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
        // disableClickZoom: false, // 클러스터 마커를 클릭했을 때 지도가 확대되도록 설정한다
      });

      setClusterer(clusterer);
    }
  }, [map, minLevel]);

  //   console.log('clusterer', clusterer);

  return <clustererContext.Provider value={clusterer}>{children}</clustererContext.Provider>;
};

export default Clusterer;
