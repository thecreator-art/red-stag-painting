import type { ServiceFeatureData } from '@/data/types';
import RoomCostCalculatorFeature from '@/components/service-features/RoomCostCalculatorFeature';
import HomeSizeEstimatorFeature from '@/components/service-features/HomeSizeEstimatorFeature';
import PaintingVsReplacingFeature from '@/components/service-features/PaintingVsReplacingFeature';
import DamageSizeGuideFeature from '@/components/service-features/DamageSizeGuideFeature';
import AsbestosNoticeFeature from '@/components/service-features/AsbestosNoticeFeature';
import StuccoConditionAssessmentFeature from '@/components/service-features/StuccoConditionAssessmentFeature';
import TrimChecklistFeature from '@/components/service-features/TrimChecklistFeature';
import ColorDirectionGuideFeature from '@/components/service-features/ColorDirectionGuideFeature';
import TurnoverPackageBuilderFeature from '@/components/service-features/TurnoverPackageBuilderFeature';
import WallpaperLayerEstimateFeature from '@/components/service-features/WallpaperLayerEstimateFeature';
import CeilingTypesFeature from '@/components/service-features/CeilingTypesFeature';
import GaragePackageOptionsFeature from '@/components/service-features/GaragePackageOptionsFeature';
import StainTypeSelectorFeature from '@/components/service-features/StainTypeSelectorFeature';

interface ServiceFeatureRendererProps {
  feature: ServiceFeatureData;
}

export default function ServiceFeatureRenderer({ feature }: ServiceFeatureRendererProps) {
  switch (feature.type) {
    case 'roomCalculator':
      return <RoomCostCalculatorFeature data={feature} />;
    case 'homeSizeEstimator':
      return <HomeSizeEstimatorFeature data={feature} />;
    case 'paintingVsReplacing':
      return <PaintingVsReplacingFeature data={feature} />;
    case 'damageSizeGuide':
      return <DamageSizeGuideFeature data={feature} />;
    case 'asbestosNotice':
      return <AsbestosNoticeFeature data={feature} />;
    case 'stuccoConditionAssessment':
      return <StuccoConditionAssessmentFeature data={feature} />;
    case 'trimChecklist':
      return <TrimChecklistFeature data={feature} />;
    case 'colorDirectionGuide':
      return <ColorDirectionGuideFeature data={feature} />;
    case 'turnoverPackageBuilder':
      return <TurnoverPackageBuilderFeature data={feature} />;
    case 'wallpaperLayerEstimate':
      return <WallpaperLayerEstimateFeature data={feature} />;
    case 'ceilingTypes':
      return <CeilingTypesFeature data={feature} />;
    case 'garagePackageOptions':
      return <GaragePackageOptionsFeature data={feature} />;
    case 'stainTypeSelector':
      return <StainTypeSelectorFeature data={feature} />;
    default:
      return null;
  }
}
