import { useControlledState } from "@react-stately/utils";
import { HintText } from "@/components/base/input/hint-text";
import type { InputBaseProps } from "@/components/base/input/input";
import { InputBase, TextField } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { AmexIcon, DiscoverIcon, MastercardIcon, UnionPayIcon, VisaIcon } from "@/components/foundations/payment-icons";

const cardTypes = [
    {
        name: "Visa",
        pattern: /^4[0-9]{3,}$/,        card: "visa",
        icon: VisaIcon,
    },
    {
        name: "MasterCard",
        pattern: /^5[1-5][0-9]{2,}$/,        card: "mastercard",
        icon: MastercardIcon,
    },
    {
        name: "American Express",
        pattern: /^3[47][0-9]{2,}$/,        card: "amex",
        icon: AmexIcon,
    },
    {
        name: "Discover",
        pattern: /^6(?:011|5[0-9]{2}|4[4-9][0-9])[0-9]{12}$/,        card: "discover",
        icon: DiscoverIcon,
    },
    {
        name: "UnionPay",
        pattern: /^(62|88)[0-9]{14,17}$/,        card: "unionpay",
        icon: UnionPayIcon,
    },
    {
        name: "Unknown",
        pattern: /.*/,        card: "unknown",
        icon: MastercardIcon,
    },
];

const detectCardType = (number: string) => {
    const sanitizedNumber = number.replace(/\D/g, "");

    const card = cardTypes.find((cardType) => cardType.pattern.test(sanitizedNumber));

    return card || cardTypes[cardTypes.length - 1];
};

export const formatCardNumber = (number: string) => {
    const cleaned = number.replace(/\D/g, "");

    const match = cleaned.match(/\d{1,4}/g);

    if (match) {
        return match.join(" ");
    }

    return cleaned;
};

interface PaymentInputProps extends Omit<InputBaseProps, "icon"> {}

export const PaymentInput = ({ onChange, value, defaultValue, className, maxLength = 19, label, hint, ...props }: PaymentInputProps) => {
    const [cardNumber, setCardNumber] = useControlledState(value, defaultValue || "", (value) => {
        value = value.replace(/\D/g, "");

        onChange?.(value || "");
    });

    const card = detectCardType(cardNumber);

    return (
        <TextField
            aria-label={!label ? props?.placeholder : undefined}
            {...props}
            className={className}
            inputMode="numeric"
            maxLength={maxLength}
            value={formatCardNumber(cardNumber)}
            onChange={setCardNumber}
        >
            {({ isDisabled, isInvalid, isRequired }) => (
                <>
                    {label && <Label isRequired={isRequired}>{label}</Label>}

                    <InputBase
                        {...props}
                        isDisabled={isDisabled}
                        isInvalid={isInvalid}
                        icon={card.icon}
                        inputClassName="pl-13"
                        iconClassName="left-2.5 h-6 w-8.5"
                    />

                    {hint && <HintText isInvalid={isInvalid}>{hint}</HintText>}
                </>
            )}
        </TextField>
    );
};

PaymentInput.displayName = "PaymentInput";
