import { Box, Button, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import cardMedia from '../../../../public/Images/pendant.png'
import avatar from '../../../../public/Images/AvatarPendant.png'
import Image from 'next/image'
import Link from 'next/link'

function PendantsCard() {
  return (
    <Box
      sx={{
        background: '#ffffff',
        boxShadow: '0px 4px 8px rgba(0, 33, 82, 0.08)',
        borderRadius: '8px',
        paddingBottom: 2,
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Image src={cardMedia} layout="responsive" alt="pendant" />
      </Box>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Box sx={{ pl: 2, mt: 2 }}>
          <Button
            sx={{
              textTransform: 'none',
              background: 'rgba(116, 80, 240, 0.2)',
              borderRadius: '2px',
              padding: '2px 8px',
              color: '#7450F0',
              fontSize: '14px',
              lineHeight: '18px',
              fontWeight: '400',
              mr: 1,
            }}
          >
            rent
          </Button>
          <Button
            sx={{
              textTransform: 'none',
              background: '#FFF7E6',
              borderRadius: '2px',
              padding: '2px 8px',
              color: '#229464',
              fontSize: '14px',
              lineHeight: '18px',
              fontWeight: '400',
              ml: '3px',
            }}
          >
            pending proposal
          </Button>
        </Box>
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ pl: 2, mt: 2 }}
      >
        <Typography
          variant="p"
          sx={{
            color: '#1A1859',
            fontSize: '24px',
            fontWeight: '700',
            lineHeight: '32px',
          }}
        >
          BRL 1,700,000.00
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: '#1A1859',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '18px',
            mt: 1,
          }}
        >
          Jaceguai Street, Bela Vista, São Paulo - SP - CEP 01315010
        </Typography>
        <Typography
          variant="p"
          sx={{
            color: '#9FAAB1',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '18px',
            mt: 1,
          }}
        >
          2 Proposals:
        </Typography>
      </Grid>
    {
        [0,1].map((data,index) => (
            <Box key={index}>
            <Grid container spacing={1} sx={{ pl: 1.5, mt: 1 }}>
              <Grid item xs={6}>
                <Grid
                  container
                  direction="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  <Box sx={{ display: 'flex' }}>
                    <Image src={avatar} alt="avatar" />
                    <Typography
                      variant="p"
                      sx={{
                        ml: 1,
                        mt: 0.5,
                        color: '#1A1859',
                        fontSize: '14px',
                        fontWeight: '400',
                        lineHeight: '18px',
                      }}
                    >
                      Jefferson Luiz
                    </Typography>
                  </Box>
                  <Typography
                    variant="p"
                    sx={{
                      pl: 1,
                      color: '#9FAAB1',
                      fontSize: '14px',
                      fontWeight: '400',
                      lineHeight: '18px',
                    }}
                  >
                    14/03/2021, 14:32
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="p"
                  sx={{
                    ml: 1,
                    mt: 0.5,
                    color: '#1A1859',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '18px',
                  }}
                >
                  BRL 1,690,000.00
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ px: 2, mt: 1 }} />
          </Box>
        ))
    }

<Grid container spacing={1} sx={{ px:2,mt:1 }}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Button
              fullWidth
                sx={{
                    color: "#FFFFFF",
                    fontSize: "14px",
                  
                   
                    lineHeight: "18px",
                    fontWeight: "600",
                    background: "#7450F0",
                    borderRadius: "4px",
                 
                    textTransform: "none",
                
                  "&:hover": {
                    color: "#FFFFFF",
                    fontSize: "14px",
                  
                   
                    lineHeight: "18px",
                    fontWeight: "600",
                    background: "#7450F0",
                    borderRadius: "4px",
                 
                    textTransform: "none",
                  },
                }}
              >
                Include proposal
              </Button>
              </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Button
                 fullWidth
                sx={{
                  color: "#FFFFFF",
                  fontSize: "14px",
                  lineHeight: "18px",
                  fontWeight: "600",
                 
                  background: "#0362F0",
                  borderRadius: "4px",
                  
                  textTransform: "none",
                  "&:hover": {
                    color: "#FFFFFF",
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "600",
                    background: "#0362F0",
                    borderRadius: "4px",
                  
                    textTransform: "none",
                  },
                }}
              >
                See proposals (2)
              </Button>
            </Grid>
            
            </Grid>
    </Box>
  )
}

export default PendantsCard
