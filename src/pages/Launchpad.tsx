import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useForm, Controller } from 'react-hook-form';
import { Box, Flex } from 'rebass';
import fleekStorage from '@fleekhq/fleek-storage-js';
import { utils } from 'ethers';
import { yupResolver } from '@hookform/resolvers/yup';

import { LaunchpadSchema } from 'data/launch.schema';

import CopyRight from 'components/Copyright';
import Button from 'components/Button';
import Card from 'components/Card';
import Disclaimer from '../components/Disclaimer';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Textarea from '../components/Textarea';
import Spinner from '../components/Spinner';
import { StyledBody, StyledContainer, TYPE } from '../theme';
// import IMG_UPLOAD from '../assets/upload.png';

import {
  useConnectedWeb3Context,
  useContracts,
  useWalletModal
} from '../contexts';
import { getLiftoffSettings } from 'utils/networks';

const StyledButton = styled(Button)`
  cursor: pointer !important;
`;

// const AddFileButton = styled.label`
//   display: flex;
//   align-items: center;
//   color: ${({ theme }) => theme.primary1};
//   border: ${({ theme }) => `1px solid ${theme.border}`};
//   border-radius: 5px;
//   background: none;
//   padding: 0.5rem 1rem;
//   width: fit-content;

//   > input {
//     width: 0;
//     height: 0;
//     padding: 0;
//   }
// `;

interface ILaunchPadInput {
  projectName: string;
  tokenTicker: string;
  projectDescription: string;
  websiteLink: string;
  whitepaperLink: string;
  dappLink: string;
  discord: string;
  telegram: string;
  twitter: string;
  facebook: string;
  date: string;
  time: string;
  softCap: string;
  hardCap: string;
  totalSupply: string;
  logo: FileList;
}

const Launchpad: FC = () => {
  const [loading, setLoading] = useState(false);
  const context = useConnectedWeb3Context();
  const [, toggleModal] = useWalletModal();
  const { liftoffRegistration } = useContracts(context);

  const { control, errors, register, handleSubmit } = useForm({
    mode: 'all',
    resolver: yupResolver(LaunchpadSchema)
  });

  const convertFormToConfig = (data: ILaunchPadInput, logoUrl: string) => {
    const config: {
      [key: string]: string;
    } = {};
    (Object.keys(data) as Array<keyof typeof data>).forEach((key) => {
      if (key === 'logo') {
        config[key] = logoUrl;
      } else {
        config[key] = data[key];
      }
    });

    return config;
  };

  const today = new Date();
  const defaultDate =
    today.getFullYear() +
    '-' +
    (today.getMonth() > 8
      ? today.getMonth() + 1
      : '0' + (today.getMonth() + 1)) +
    '-' +
    (today.getDate() > 9 ? today.getDate() : '0' + today.getDate());

  const onSubmit = async (data: ILaunchPadInput) => {
    try {
      if (typeof context.networkId === 'undefined') {
        toggleModal(true);
      } else {
        if (loading) {
          return;
        }
        const settings = getLiftoffSettings(context.networkId);
        const startTime = Math.round(
          new Date(`${data.date} ${data.time}:00 UTC`).getTime() / 1000
        );
        const currentTime = Math.round(Date.now() / 1000);
        if (
          startTime < currentTime + settings.minTimeToLaunch ||
          startTime > currentTime + settings.maxTimeToLaunch
        ) {
          throw new Error(
            `Not allowed to launch before minLaunchTime & after maxLaunchTime`
          );
        }

        const baseKey = `liftoff-rockets/${data.tokenTicker}`;

        setLoading(true);

        // upload images
        const logo = await fleekStorage.upload({
          apiKey: process.env.REACT_APP_FLEEK_API_KEY || 'api-key',
          apiSecret: process.env.REACT_APP_FLEEK_API_SECRET || 'api-secret',
          key: `${baseKey}/logo.png`,
          data: data.logo[0]
        });

        // upload json
        const configJson = JSON.stringify(
          convertFormToConfig(data, logo.publicUrl)
        );
        const configBlob = new Blob([new TextEncoder().encode(configJson)], {
          type: 'application/json;charset=utf-8'
        });
        const config = await fleekStorage.upload({
          apiKey: process.env.REACT_APP_FLEEK_API_KEY || 'api-key',
          apiSecret: process.env.REACT_APP_FLEEK_API_SECRET || 'api-secret',
          key: `${baseKey}/config.json`,
          data: configBlob
        });
        if (liftoffRegistration) {
          await liftoffRegistration.registerProject(
            config.hash,
            startTime,
            utils.parseEther(data.softCap).toString(),
            utils.parseEther(data.hardCap).toString(),
            utils.parseEther(data.totalSupply).toString(),
            data.projectName,
            data.tokenTicker
          );
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);

      alert(error.message || error);

      setLoading(false);
    }
  };

  return (
    <>
      <StyledBody color="bg2">
        <StyledContainer sWidth="800px">
          <TYPE.LargeHeader color="white" textAlign="center">
            🕹Launchpad for Developers
          </TYPE.LargeHeader>
          <TYPE.Header marginY="1.875rem" color="white">
            How it works?
          </TYPE.Header>
          <TYPE.Body color="white" textAlign="center" lineHeight="1.5rem">
            1. Register your project with this form.
            <br />
            2. Include a link to your working dapp that will use the created
            token.
            <br />
            3. Submit and pay the gas fee.
            <br />
            4. Liftoff will create your ERC20 token and your project's liftoff
            page.
          </TYPE.Body>
          <Box width="100%" mt="2.5rem">
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset disabled={loading}>
                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Project Name
                  </TYPE.Header>
                  <Controller
                    control={control}
                    name="projectName"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="Liquidity Dividends Protocol"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({ required: 'Project Name is required' })}
                      />
                    )}
                  />
                  {errors.projectName && (
                    <TYPE.Small color="red1">
                      {errors.projectName.message}
                    </TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Token ticker
                  </TYPE.Header>
                  <Controller
                    control={control}
                    name="tokenTicker"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="XYZ"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({ required: 'Token ticker is required' })}
                      />
                    )}
                  />
                  {errors.tokenTicker && (
                    <TYPE.Small color="red1">
                      {errors.tokenTicker.message}
                    </TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Project Description
                  </TYPE.Header>
                  <Controller
                    control={control}
                    name="projectDescription"
                    render={({ onChange, onBlur, value, name }) => (
                      <Textarea
                        placeholder="Text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Project description is required'
                        })}
                      />
                    )}
                  />
                  {errors.projectDescription && (
                    <TYPE.Small color="red1">
                      {errors.projectDescription.message}
                    </TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <Flex alignItems="center" mb="1.25rem">
                    <TYPE.Header color="black" mr=".875rem">
                      Logo
                    </TYPE.Header>
                    <TYPE.Body color="black">
                      (Image format: png, jpg, svg)
                    </TYPE.Body>
                  </Flex>
                  <Input
                    name="logo"
                    type="file"
                    accept="image/x-png"
                    ref={register}
                  />
                  {errors.logo && (
                    <TYPE.Small color="red1">{errors.logo.message}</TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Website Link
                  </TYPE.Header>
                  <Controller
                    control={control}
                    name="websiteLink"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="https://website.com"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Website URL is required'
                        })}
                      />
                    )}
                  />
                  {errors.websiteLink && (
                    <TYPE.Small color="red1">
                      {errors.websiteLink.message}
                    </TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    dApp Link
                  </TYPE.Header>
                  <Controller
                    control={control}
                    name="dappLink"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="https://website.com/dapp"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'DApp URL is required'
                        })}
                      />
                    )}
                  />
                  {errors.dappLink && (
                    <TYPE.Small color="red1">
                      {errors.dappLink.message}
                    </TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Whitepaper Link
                  </TYPE.Header>
                  <Controller
                    control={control}
                    name="whitepaperLink"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="https://website.com/whitepaper.pdf"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Whitepaper URL is required'
                        })}
                      />
                    )}
                  />
                  {errors.whitepaperLink && (
                    <TYPE.Small color="red1">
                      {errors.whitepaperLink.message}
                    </TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Social Media Links
                  </TYPE.Header>
                  <TYPE.Body color="black" mb="0.5rem">
                    Discord
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="discord"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="https://discord.gg/"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register}
                      />
                    )}
                  />

                  <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                    Telegram
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="telegram"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="https://t.me/"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register}
                      />
                    )}
                  />
                  <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                    Twitter
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="twitter"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="https://twitter.com/"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register}
                      />
                    )}
                  />
                  <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                    Facebook
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="facebook"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="https://facebook.com/"
                        type="text"
                        value={value}
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register}
                      />
                    )}
                  />
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    LIFTOFF Launch Date & Time
                  </TYPE.Header>
                  <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                    Date (GMT)
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="date"
                    defaultValue={defaultDate}
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="mm/dd/yyyy"
                        type="date"
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        name={name}
                        ref={register}
                      />
                    )}
                  />
                  {errors.date && (
                    <TYPE.Small color="red1">{errors.date.message}</TYPE.Small>
                  )}
                  <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                    Time (GMT)
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="time"
                    defaultValue="00:00"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="00:00 AM"
                        type="time"
                        value={value}
                        onChange={onChange}
                        name={name}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Time is required'
                        })}
                      />
                    )}
                  />
                  {errors.time && (
                    <TYPE.Small color="red1">{errors.time.message}</TYPE.Small>
                  )}
                </Card>

                <Card
                  marginBottom="1rem"
                  paddingX="1.375rem"
                  paddingY="1.875rem"
                >
                  <TYPE.Header color="black" mb="1.25rem">
                    Soft & Hard Cap / TotalSupply
                  </TYPE.Header>
                  <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                    Soft Cap
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="softCap"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="100"
                        type="number"
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Softcap is required'
                        })}
                      />
                    )}
                  />
                  {errors.softCap && (
                    <TYPE.Small color="red1">
                      {errors.softCap.message}
                    </TYPE.Small>
                  )}
                  <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                    Hard Cap
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="hardCap"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="1000"
                        type="number"
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Hardcap is required'
                        })}
                      />
                    )}
                  />
                  {errors.hardCap && (
                    <TYPE.Small color="red1">
                      {errors.hardCap.message}
                    </TYPE.Small>
                  )}
                  <TYPE.Body color="black" mt="1rem" mb="0.5rem">
                    Total Supply
                  </TYPE.Body>
                  <Controller
                    control={control}
                    name="totalSupply"
                    render={({ onChange, onBlur, value, name }) => (
                      <Input
                        placeholder="100000"
                        type="number"
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        ref={register({
                          required: 'Total Supply is required'
                        })}
                      />
                    )}
                  />
                  {errors.totalSupply && (
                    <TYPE.Small color="red1">
                      {errors.totalSupply.message}
                    </TYPE.Small>
                  )}
                </Card>

                <StyledButton type="submit">Launch</StyledButton>
              </fieldset>
            </form>
            <Disclaimer color="#b4b4b4" />
            <CopyRight mt="1.375rem" />
          </Box>
          <Spinner loading={loading} />
        </StyledContainer>
      </StyledBody>
      <Footer noBackground={false} color="bg2" />
    </>
  );
};

export default Launchpad;
