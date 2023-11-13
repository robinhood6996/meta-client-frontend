import React, {useEffect} from 'react'
import {Button, Modal} from 'react-bootstrap'
import * as Yup from 'yup'
import {KTSVG} from '../../../_metronic/helpers'
import {useCreateCategoryMutation} from '../../../redux/features/api/category/categoryApi'
import {useFormik} from 'formik'
import clsx from 'clsx'
import {ToastContainer, toast} from 'react-toastify'

type Props = {
  show: boolean
  handleClose: () => void
}

const initialValues = {
  categoryName: '',
}

const registrationSchema = Yup.object().shape({
  categoryName: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
})

export default function CreateCategory({show, handleClose}: Props) {
  //api call
  const [createCategory, {isLoading, isSuccess, isError}] = useCreateCategoryMutation()

  const handleCreateCategory = () => {}

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      if (values.categoryName !== '') {
        createCategory({
          name: values.categoryName,
        })
      }
      formik.resetForm()
      handleClose()
    },
  })

  useEffect(() => {
    if (!show) {
      formik.resetForm()
    }
  }, [show])

  //toast
  useEffect(() => {
    if (!isLoading && !isError && isSuccess) {
      toast.success('Successfully created category', {
        hideProgressBar: true,
        toastId: 'categoryCreateSuccess',
      })
    }
    if (!isLoading && isError && !isSuccess) {
      toast.error('Failed to create category', {
        hideProgressBar: true,
        toastId: 'categoryCreateError',
      })
    }
    return () => {
      setTimeout(() => {
        toast.dismiss('categoryCreateSuccess')
        toast.dismiss('categoryCreateError')
      }, 2000)
    }
  }, [isError, isLoading, isSuccess])

  return (
    <div>
      <Modal
        id='kt_modal_create_app'
        tabIndex={-1}
        aria-hidden='true'
        dialogClassName='modal-dialog modal-dialog-centered mw-900px'
        show={show}
        onHide={handleClose}
      >
        <div className='modal-header'>
          <h2>Create Category</h2>
          {/* begin::Close */}
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
          {/* end::Close */}
        </div>

        <form action='' onSubmit={formik.handleSubmit}>
          <div className='modal-body py-lg-10 px-lg-10'>
            <div className='fv-row mb-10'>
              <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                <span className='required'>Category Name</span>
                <i
                  className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Specify your unique app name'
                ></i>
              </label>
              <input
                type='text'
                className={clsx(
                  'form-control form-control-lg form-control-solid',
                  {
                    'is-invalid': formik.touched.categoryName && formik.errors.categoryName,
                  },
                  {
                    'is-valid': formik.touched.categoryName && !formik.errors.categoryName,
                  }
                )}
                placeholder=''
                {...formik.getFieldProps('categoryName')}
              />
            </div>
            {formik.touched.categoryName && formik.errors.categoryName && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.categoryName}</span>
                </div>
              </div>
            )}
            <div className='d-flex justify-content-end mb-2'>
              <Button
                type='submit'
                className='btn btn-sm fw-bold btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_create_app'
              >
                Create
              </Button>
            </div>
          </div>
        </form>
      </Modal>
      <ToastContainer />
    </div>
  )
}
