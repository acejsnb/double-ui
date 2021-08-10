import FormInstance from './Form';
import Item from './Item';
import FormInput from './FormInput';

type TypeForm = typeof FormInstance
interface FormInterface extends TypeForm {
    Item: typeof Item
    Input: typeof FormInput
}
const Form = FormInstance as FormInterface;
Form.Item = Item;
Form.Input = FormInput;

export default Form;
