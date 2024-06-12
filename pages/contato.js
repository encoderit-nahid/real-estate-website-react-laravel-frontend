import { Container, Typography } from "@mui/material";
import React from "react";

const Contato = () => {
  return (
    <div>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Typography variant="h6">Entre em contato com a Lokkan!</Typography>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Lokkan: Seu parceiro completo em soluções imobiliárias!
        </Typography>
        <Typography variant="p">
          Precisa de ajuda para comprar, vender ou alugar um imóvel? A Lokkan
          está aqui para te auxiliar em todas as suas necessidades imobiliárias!
          Nossa equipe de especialistas está pronta para oferecer:
        </Typography>
        <ul>
          <li>
            <Typography variant="p">
              Atendimento personalizado: Esclarecemos dúvidas, fornecemos
              informações detalhadas sobre nossos serviços e encontramos a
              solução ideal para você.
            </Typography>
          </li>
          <li>
            <Typography variant="p">
              Visitas virtuais: Conheça os imóveis à distância, com conforto e
              segurança, através de passeios virtuais interativos.
            </Typography>
          </li>
          <li>
            <Typography variant="p">
              Acompanhamento: Do ​​início ao fim do processo, estamos ao seu
              lado para garantir uma experiência tranquila e segura.
            </Typography>
          </li>
        </ul>
        <Typography variant="p">Entre em contato conosco:</Typography>
        <ul>
          <li>
            <Typography variant="p">Telefone: (11) 91128-0640</Typography>
          </li>
          <li>
            <Typography variant="p">WhatsApp: (11) 91128-0640</Typography>
          </li>
          <li>
            <Typography variant="p">
              E-mail: [endereço de e-mail removido]
            </Typography>
          </li>
        </ul>
        <Typography variant="p" sx={{ display: "block", mt: 1 }}>
          Fique à vontade para nos contatar a qualquer momento!
        </Typography>
        <Typography variant="p" sx={{ display: "block", mt: 1 }}>
          Lokkan: A sua melhor escolha para realizar seus sonhos imobiliários!
        </Typography>
        <Typography variant="p" sx={{ display: "block", mt: 1 }}>
          #lokkan #imobiliaria #compra #venda #aluguel #imóvel #casa
          #apartamento #fácil #rápido #seguro #atendimento #especializado
          #inovação #tecnologia #futuro #investimento #realização #sonho
        </Typography>
      </Container>
    </div>
  );
};

export default Contato;
