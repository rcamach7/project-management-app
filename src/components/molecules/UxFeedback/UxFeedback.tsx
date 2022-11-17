import PopupBanner from './PopupBanner';
import ScreenLoading from './ScreenLoading';

interface Props {
  loading: boolean;
  showBanner: boolean;
  bannerMessage: string;
  bannerType: 'success' | 'error';
}

export default function UxFeedback({
  loading,
  showBanner,
  bannerMessage,
  bannerType,
}: Props) {
  return (
    <>
      {loading && <ScreenLoading />}
      {showBanner && (
        <PopupBanner message={bannerMessage} bannerType={bannerType} />
      )}
    </>
  );
}
