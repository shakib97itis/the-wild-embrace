import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCreateCabin from "../../features/cabins/useCreateCabin";
import useUpdateCabin from "../../features/cabins/useUpdateCabin";

const CreateCabinForm = ({ cabinToEdit, isEditMode }) => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditMode ? { ...cabinToEdit } : {},
  });
  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();

  const isPending = isCreating || isUpdating;

  const handleCabinForm = (data) => {
    if (!isEditMode)
      createCabin(
        { ...data, image: data.image?.[0] },
        {
          onSuccess: () => reset(),
        }
      );

    if (isEditMode)
      updateCabin({
        id: cabinToEdit.id,
        cabin: {
          ...data,
          oldImageLink: cabinToEdit.image,
          image: typeof data.image === "string" ? data.image : data.image?.[0],
        },
      });
  };

  const handleCabinFormError = (errors) => {
    console.log(errors);
  };

  return (
    <Form onSubmit={handleSubmit(handleCabinForm, handleCabinFormError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", {
            required: {
              value: true,
              message: "Name is required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          defaultValue={1}
          disabled={isPending}
          {...register("maxCapacity", {
            required: {
              value: true,
              message: "Capacity is required",
            },
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          defaultValue={0}
          disabled={isPending}
          {...register("regularPrice", {
            required: {
              value: true,
              message: "Regular price is required",
            },
            min: {
              value: 0,
              message: "Regular price cannot be negative",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isPending}
          {...register("discount", {
            required: {
              value: true,
              message: "Discount is required",
            },
            validate: (value) => {
              if (Number(value) > Number(getValues("regularPrice"))) {
                return "Discount must be less than regular price";
              }
              return true;
            },
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isPending}
          {...register("description", {
            required: {
              value: true,
              message: "Description is required",
            },
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isPending}
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        <>
          {/* type is an HTML attribute! */}
          <Button variation="secondary" type="reset">
            Clear form
          </Button>
          <Button disabled={isPending}>
            {isPending ? "Loading..." : "Add cabin"}
          </Button>
        </>
      </FormRow>
    </Form>
  );
};

export default CreateCabinForm;
