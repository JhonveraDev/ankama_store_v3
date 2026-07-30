import { useMemo, useState } from 'react'

interface ProductGalleryProps {
  imageUrl: string
  images?: string[]
  productName: string
}

export function ProductGallery({ imageUrl, images, productName }: ProductGalleryProps) {
  const galleryImages = useMemo(() => {
    const availableImages = images?.filter(Boolean) ?? []
    return availableImages.length > 0 ? availableImages : [imageUrl]
  }, [imageUrl, images])
  const [selectedImage, setSelectedImage] = useState(galleryImages[0])

  return (
    <section className="product-gallery" aria-label={`Galería de ${productName}`}>
      <div className="product-gallery-thumbnails">
        {galleryImages.map((image, index) => (
          <button aria-label={`Ver imagen ${index + 1} de ${productName}`} aria-pressed={selectedImage === image} className={selectedImage === image ? 'is-active' : ''} key={`${image}-${index}`} onClick={() => setSelectedImage(image)} type="button">
            <img alt="" src={image} onError={(event) => { event.currentTarget.hidden = true }} />
          </button>
        ))}
      </div>
      <div className="product-gallery-main">
        <img alt={productName} src={selectedImage} onError={(event) => { event.currentTarget.hidden = true }} />
      </div>
    </section>
  )
}
