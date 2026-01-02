'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';

/**
 * Image Upload Component with Cloudinary integration
 * Supports single and multiple image uploads
 */
const ImageUpload = ({
  value = '',
  onChange,
  multiple = false,
  folder = 'hostizzy',
  label = 'Upload Image',
  maxFiles = 5
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const [previews, setPreviews] = useState(Array.isArray(value) ? value : []);
  const fileInputRef = useRef(null);

  // Sync internal state with prop changes
  useEffect(() => {
    if (multiple) {
      setPreviews(Array.isArray(value) ? value : []);
    } else {
      setPreview(value || '');
    }
  }, [value, multiple]);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    try {
      if (multiple) {
        // Handle multiple files
        const uploadPromises = files.map(file => uploadToCloudinary(file, folder));
        const results = await Promise.all(uploadPromises);
        const urls = results.map(r => r.url);

        const newPreviews = [...previews, ...urls].slice(0, maxFiles);
        setPreviews(newPreviews);
        onChange(newPreviews);
      } else {
        // Handle single file
        const result = await uploadToCloudinary(files[0], folder);
        setPreview(result.url);
        onChange(result.url);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const uploadToCloudinary = async (file, folder) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = async () => {
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              image: reader.result,
              folder: folder
            })
          });

          const data = await response.json();

          if (data.success) {
            resolve(data);
          } else {
            reject(new Error(data.error || 'Upload failed'));
          }
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index = null) => {
    if (multiple) {
      const newPreviews = previews.filter((_, i) => i !== index);
      setPreviews(newPreviews);
      onChange(newPreviews);
    } else {
      setPreview('');
      onChange('');
    }
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          fontWeight: 600,
          color: '#334155',
          fontSize: '0.95rem'
        }}>
          {label}
        </label>
      )}

      {/* Upload Button */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          id="image-upload"
        />

        <label
          htmlFor="image-upload"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: uploading ? '#e2e8f0' : '#3b82f6',
            color: 'white',
            borderRadius: '0.5rem',
            cursor: uploading ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            border: 'none',
            transition: 'all 0.2s'
          }}
        >
          {uploading ? (
            <>
              <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={18} />
              {multiple ? 'Upload Images' : 'Upload Image'}
            </>
          )}
        </label>

        <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      {/* Preview Section */}
      {multiple ? (
        /* Multiple Image Previews */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
          gap: '1rem'
        }}>
          {previews.map((url, index) => (
            <div
              key={index}
              style={{
                position: 'relative',
                aspectRatio: '1',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                border: '2px solid #e2e8f0',
                backgroundColor: '#f8fafc'
              }}
            >
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <button
                onClick={() => removeImage(index)}
                style={{
                  position: 'absolute',
                  top: '0.25rem',
                  right: '0.25rem',
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        /* Single Image Preview */
        preview && (
          <div style={{
            position: 'relative',
            maxWidth: '300px',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            border: '2px solid #e2e8f0',
            backgroundColor: '#f8fafc'
          }}>
            <img
              src={preview}
              alt="Preview"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
            <button
              onClick={() => removeImage()}
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                background: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <X size={18} />
            </button>
          </div>
        )
      )}

      {/* Helper Text */}
      <p style={{
        marginTop: '0.5rem',
        fontSize: '0.85rem',
        color: '#64748b'
      }}>
        {multiple
          ? `Upload up to ${maxFiles} images. Supported formats: JPG, PNG, WebP`
          : 'Supported formats: JPG, PNG, WebP. Max size: 10MB'}
      </p>
    </div>
  );
};

export default ImageUpload;
