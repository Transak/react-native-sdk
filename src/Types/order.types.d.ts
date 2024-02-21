type PaymentOptionField = {
  name: string;
  value: string;
};

type PaymentOption = {
  currency: string;
  id: string;
  name: string;
  fields: PaymentOptionField[];
};

type CardPaymentData = {
  orderId: string;
  paymentId: string;
  pgData: {
    paymentOptions: PaymentOption[];
    liquidityProvider: string;
    status: string;
  };
  liquidityProvider: string;
  updatedAt: string;
};

type StatusHistory = {
  status: string;
  createdAt: string;
  message: string;
  isEmailSentToUser: boolean;
  partnerEventId: string;
};

export type Order = {
  id: string;
  walletAddress: string;
  createdAt: string;
  status: string;
  fiatCurrency: string;
  userId: string;
  cryptoCurrency: string;
  isBuyOrSell: string;
  fiatAmount: number;
  ipAddress: string;
  amountPaid: number;
  paymentOptionId: string;
  walletLink: string;
  orderProcessingType: string;
  addressAdditionalData: boolean;
  network: string;
  conversionPrice: number;
  cryptoAmount: number;
  totalFeeInFiat: number;
  fiatAmountInUsd: number;
  countryCode: string;
  referenceCode: number;
  paymentOptions: PaymentOption[];
  autoExpiresAt: string;
  stateCode: string;
  userKycType: string;
  cardPaymentData: CardPaymentData;
  statusHistories: StatusHistory[];
};
