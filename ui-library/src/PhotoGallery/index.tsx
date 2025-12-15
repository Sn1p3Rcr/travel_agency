import React from 'react'

export type PhotoGalleryProps = {
  photos: string[]
}

export const PhotoGallery = ({ photos }: PhotoGalleryProps): JSX.Element => (
  <div style={{ display: 'flex', gap: 8 }} data-testid="photo-gallery">
    {photos.map((p) => (
      <img key={p} src={p} alt="gallery" style={{ width: 120 }} />
    ))}
  </div>
)

export default PhotoGallery
