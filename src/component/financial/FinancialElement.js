import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import BaseFilePicker from '../reuseable/baseFilePicker/BaseFilePicker'
import { Button } from 'react-scroll'
import { useFieldArray, useForm } from 'react-hook-form'
import homeImage from "../../../public/Images/homeImage.jpg";
import en from 'locales/en'
import pt from 'locales/pt'
import { useGetFinancialQuery } from '@/queries/useGetFinancialQuery'

function FinancialElement({language}) {
    const {
        register,
        watch,
        control,
        handleSubmit,
        formState: { errors },
        setError,
      } = useForm()
      const { fields, append, remove } = useFieldArray({
        control,
        name: 'attachments',
      })
      const allValues = watch()
      const [myValue, setMyValue] = useState(language || "pt");
      
      const t = myValue === "en" ? en : pt;
    
      const {data: financialData} = useGetFinancialQuery()
      console.log({financialData})
    
      const [files, setFiles] = useState([])
      const [deletedContent, setDeletedContent] = useState([])
      const [imageError, setImageError] = useState(false)
      const [imageErrorMessage, setImageErrorMessage] = useState('')
  return (
    <Box
    sx={{
      p: '16px',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255)',

    }}
  >
    {/* 👇 */}

    <Stack
      direction={'row'}
      sx={{
        border: '1px solid #DBE1E5',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <Image
        src={homeImage}
        alt="home"
        width={'120px'}
        height={'108px'}
        objectFit="cover"
      />

      <Box
        sx={{
          p: 2,
        }}
      >
        <Stack direction={'row'} spacing={2}>
          <Box
            sx={{
              px: 1,
              color: '#7450F0',
              backgroundColor: '#e3dcfc',
              width: 'fit-content',
            }}
          >
            {t['sale']}
          </Box>
          <Box
            sx={{
              px: 1,
              color: '#114B32',
              backgroundColor: '#ddf8ed',
              width: 'fit-content',
            }}
          >
            {t['published']}
          </Box>
        </Stack>
        <Typography
          sx={{
            fontSize: '14px',
            color: '#6C7A84',
            mt: 1,
          }}
        >
          8502 Preston Rd. Inglewood, <br /> Maine 98380
        </Typography>
      </Box>
    </Stack>

    {/* 👆 */}
    <Stack direction={'row'} spacing={3} sx={{ mt: 1 }}>
      <Box>
        <Typography
          sx={{
            fontSize: '14px',
            color: '#6C7A84',
          }}
        >
          {t['sale value']}
        </Typography>
        <Typography
          sx={{
            fontSize: '20px',
            color: '#1A1859',
            mt: 1,
          }}
        >
          R$7000,000.00
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: '14px',
            color: '#6C7A84',
          }}
        >
          {t['Commission']}
        </Typography>
        <Typography
          sx={{
            fontSize: '20px',
            color: '#1A1859',
            mt: 1,
          }}
        >
          R$17,000.00
        </Typography>
      </Box>
    </Stack>
    <Typography
      sx={{
        fontSize: '16px',
        color: '#1A1859',
        mt: 2,
      }}
    >
      RPA
    </Typography>
    {files.length == 0 && (
      <BaseFilePicker
        control={control}
        errors={errors}
        files={files}
        setFiles={setFiles}
        setDeletedContent={setDeletedContent}
        deletedContent={deletedContent}
        imageError={imageError}
        imageErrorMessage={imageErrorMessage}
        fields={fields}
        append={append}
        remove={remove}
        allValues={allValues}
        languageName={myValue.toString()}
        hideTitle
        hideVideoPicker
        hidePictureGrid
        hideVideoGrid
      />
    )}
    {files.length > 0 && (
      <Box
        sx={{
          border: '1px solid #DBE1E5',
          borderRadius: '8px',
          p: 2,
          mt: 1,
        }}
      >
        <Box
          sx={{
            px: 1,
            color: '#0362F0',
            backgroundColor: '#E0F2FE',
            width: 'fit-content',
            fontSize: '14px',
          }}
        >
          RPA
        </Box>
        <Typography
          sx={{
            color: '#1A1859',
            fontSize: '16px',
            mt: 2,
          }}
        >
          {files[0]?.name}
        </Typography>
        <Stack
          direction={'row'}
          spacing={1}
          justifyContent={'flex-end'}
          m={2}
        >
          <Stack direction={'row'} spacing={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => setFiles([])}
            >
              Delete
            </Button>
            <Button variant="contained" color="success">
              To send
            </Button>
          </Stack>
        </Stack>
      </Box>
    )}
  </Box>
  )
}

export default FinancialElement