import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeroVideoSection from '../components/home/HeroVideoSection';
import CategoryGrid from '../components/home/CategoryGrid';
import NewArrivalsSection from '../components/home/NewArrivalsSection';
import EthnicCollectionSection from '../components/home/EthnicCollectionSection';
import AccessoriesSection from '../components/home/AccessoriesSection';
import HandmadePicksSection from '../components/home/HandmadePicksSection';
import PromoBanner from '../components/common/PromoBanner';
import BrandStoryVideoSection from '../components/home/BrandStoryVideoSection';
import { fetchHomeCollections } from '../store/slices/productSlice';
import { fetchPromoVideos } from '../store/slices/promoSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { homeCollections } = useSelector((state) => state.products);
  const { activeVideo, brandStoryVideo } = useSelector((state) => state.promo);

  useEffect(() => {
    dispatch(fetchHomeCollections());
    dispatch(fetchPromoVideos());
  }, [dispatch]);

  return (
    <div className="space-y-12 pb-14">
      <HeroVideoSection videoUrl={activeVideo?.videoUrl} />
      <CategoryGrid />
      <NewArrivalsSection products={homeCollections.newArrivals} />
      <EthnicCollectionSection products={homeCollections.ethnicCollection} />
      <AccessoriesSection products={homeCollections.accessories} />
      <HandmadePicksSection products={homeCollections.handmade} />
      <PromoBanner
        title="Crafted by artisans, styled for modern life"
        description="Discover textile stories through handmade weaves, oxidized jewelry and everyday ethnic essentials."
        ctaText="Explore Collection"
        ctaLink="/products"
        imageUrl="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
      />
      <BrandStoryVideoSection video={brandStoryVideo} />
    </div>
  );
};

export default HomePage;
