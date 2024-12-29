export enum FieldType {
  Text = '1',
  Number = '2',
  Decimal = '3',
  DateTime = '4',
  Checkbox = '6',
  List = '7',
  PriceList = '12',
  Confirm = '13'
}

interface BaseFieldProps {
  Guid: string;
  Sign: string;
  Type: FieldType;
  Value?: string;
  Visible: "True" | "False";
  Editable: "True" | "False";
  Required: "True" | "False";
  SignVisible: "True";
  ConfirmRequired: "False";
}

export interface TextField extends BaseFieldProps {
  Type: FieldType.Text;
  MaxLen: string;
  MinLen: "0";
  UseBarcode: "False";
  MarkBarCode: "False";
  CorrectBarCodeEnd: "0";
  CorrectBarCodeStart: "0";
}

export interface NumberField extends BaseFieldProps {
  Type: FieldType.Number;
  Min: string;
  Max: string;
}

export interface DecimalField extends BaseFieldProps {
  Type: FieldType.Decimal;
  Min: string;
  Max: string;
  Precision: string;
}

export interface DateTimeField extends BaseFieldProps {
  Type: FieldType.DateTime;
  UseDate: "True" | "False";
  UseTime: "True" | "False";
}

export interface CheckboxField extends BaseFieldProps {
  Type: FieldType.Checkbox;
  Filled: "False";
  Checked: "False";
  ThreeStates: "False";
}

export interface ListItem {
  Count: string;
  Filtered: string;
  NameItem: string;
  Selected: "True" | "False";
  ValueItem: string;
}

export interface ListField extends BaseFieldProps {
  Type: FieldType.List;
  List: ListItem[];
  EditCount: "False";
  ShowCount: "False";
  UseFilter: "False";
  AddNewItem: "False";
  UseBarcode: "True";
  MarkBarCode: "False";
  SignVisible: "True";
  FilterSource: "-1";
  UseMultiSelect: "True" | "False";
  AllListAsResult: "True";
  ConfirmRequired: "False";
  CorrectBarCodeEnd: "0";
  CorrectBarCodeStart: "0";
  SynchronizeCountSelected: "False";
}

export interface PriceListItem {
  Num: "-1";
  Tax: "0";
  Gtin: string;
  Coeff: "1";
  Count: string;
  GtinA: string;
  BarCode: string;
  Checked: "False";
  Comment: "";
  Service: "False";
  Filtered: "";
  MaxCount: string;
  MinCount: string;
  NameItem: string;
  ShowIntf: "True";
  ShowList: "True";
  UseCount: "False";
  CountPlan: string;
  ValueItem: string;
  CommentGUID: "00000000-0000-0000-0000-000000000000";
  Measurement: "";
  PrintEnable: "True";
  Transaction: "";
  CostPosition: string;
  ListAddedMarks: never[];
  EditCheckEnable: "True";
  EditCountEnable: "True";
  ListDeletedMarks: never[];
}

export interface PriceListField extends BaseFieldProps {
  Type: FieldType.PriceList;
  List: PriceListItem[];
  PayType: "-1";
  Prepaid: "0";
  PayLogin: "";
  UseFilter: "False";
  UseBarcode: "False";
  Description: "";
  FooterCheck: "";
  HeaderCheck: "";
  MarkBarCode: "False";
  PayPassword: "";
  FilterSource: "-1";
  PayInputType: "";
  ReceiptEmail: "";
  ReceiptPhone: "";
  PaymentParams: never[];
  UsePaySystemOnZero: "False";
}

export interface ConfirmField extends BaseFieldProps {
  Type: FieldType.Confirm;
  UserValue: string;
  UseBarcode: "False";
  MarkBarCode: "False";
  ReserveValue: string;
  CorrectBarCodeEnd: "0";
  CorrectBarCodeStart: "0";
}

export type Field = 
  | TextField 
  | NumberField 
  | DecimalField
  | DateTimeField 
  | CheckboxField 
  | ListField 
  | PriceListField 
  | ConfirmField;

export const createDefaultField = (type: FieldType): Field => {
  const baseField = {
    Guid: crypto.randomUUID(),
    Sign: `New ${type} Field`,
    Type: type,
    Value: "",
    Visible: "True" as const,
    Editable: "True" as const,
    Required: "False" as const,
    SignVisible: "True" as const,
    ConfirmRequired: "False" as const,
  };

  switch (type) {
    case FieldType.Text:
      return {
        ...baseField,
        Type: FieldType.Text,
        MaxLen: "500",
        MinLen: "0",
        UseBarcode: "False",
        MarkBarCode: "False",
        CorrectBarCodeEnd: "0",
        CorrectBarCodeStart: "0",
      };

    case FieldType.Number:
      return {
        ...baseField,
        Type: FieldType.Number,
        Min: "-2147483647",
        Max: "2147483647",
      };

    case FieldType.Decimal:
      return {
        ...baseField,
        Type: FieldType.Decimal,
        Min: "-2147483647",
        Max: "2147483647",
        Precision: "6",
      };

    case FieldType.DateTime:
      return {
        ...baseField,
        Type: FieldType.DateTime,
        UseDate: "True",
        UseTime: "True",
      };

    case FieldType.Checkbox:
      return {
        ...baseField,
        Type: FieldType.Checkbox,
        Filled: "False",
        Checked: "False",
        ThreeStates: "False",
      };

    case FieldType.List:
      return {
        ...baseField,
        Type: FieldType.List,
        List: [],
        EditCount: "False",
        ShowCount: "False",
        UseFilter: "False",
        AddNewItem: "False",
        UseBarcode: "True",
        MarkBarCode: "False",
        SignVisible: "True",
        FilterSource: "-1",
        UseMultiSelect: "True",
        AllListAsResult: "True",
        CorrectBarCodeEnd: "0",
        CorrectBarCodeStart: "0",
        SynchronizeCountSelected: "False",
      };

    case FieldType.PriceList:
      return {
        ...baseField,
        Type: FieldType.PriceList,
        List: [],
        PayType: "-1",
        Prepaid: "0",
        PayLogin: "",
        UseFilter: "False",
        UseBarcode: "False",
        Description: "",
        FooterCheck: "",
        HeaderCheck: "",
        MarkBarCode: "False",
        PayPassword: "",
        FilterSource: "-1",
        PayInputType: "",
        ReceiptEmail: "",
        ReceiptPhone: "",
        PaymentParams: [],
        UsePaySystemOnZero: "False",
      };

    case FieldType.Confirm:
      return {
        ...baseField,
        Type: FieldType.Confirm,
        UserValue: "",
        UseBarcode: "False",
        MarkBarCode: "False",
        ReserveValue: "0000",
        CorrectBarCodeEnd: "0",
        CorrectBarCodeStart: "0",
      };

    default:
      throw new Error(`Unknown field type: ${type}`);
  }
};