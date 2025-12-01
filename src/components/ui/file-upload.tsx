'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  onFileRemove: () => void
  selectedFile: File | null
  error?: string
}

export default function FileUpload({ onFileSelect, onFileRemove, selectedFile, error }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        onFileSelect(file)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0])
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <Label>Payment Screenshot *</Label>
      
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragActive
              ? 'border-blue-400'
              : error
              ? 'border-red-400 bg-red-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <div className="space-y-2">
            <Upload className="w-8 h-8 mx-auto text-gray-400" />
            <div>
              <p className="text-sm text-gray-600">
                Drag and drop your payment screenshot here, or click to browse
              </p>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative border rounded-lg p-4 bg-blue-500/10">
          <div className="flex items-center space-x-3">
            <div className="shrink-0">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-50 truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-gray-200">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                onFileRemove()
              }}
              className="text-red-500 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}