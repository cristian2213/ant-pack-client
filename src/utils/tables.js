import { ERROR, SUCCESS } from 'constants/index';
import { openNotification } from 'utils';

export const executeAndUpdateTableRecords = async (
  records,
  cb,
  pagination,
  errorObj,
  refreshCb,
  icon
) => {
  let page;
  const totalRecords = records.length;
  if (totalRecords > 1) page = pagination.current;
  if (totalRecords === 1 && pagination.current === 1) page = pagination.current;
  if (totalRecords === 1 && pagination.current !== 1)
    page = pagination.current - 1;

  const currentPagination = {
    limit: pagination.pageSize,
    page,
    total: pagination.total,
  };

  const res = await cb();
  if (res == null) {
    openNotification(
      ERROR,
      errorObj?.failed ??
        'Eliminación fallida, Por favor recarga la página e intenta nuevamente.',
      icon ?? null
    );
    return;
  }
  openNotification(
    SUCCESS,
    errorObj?.success ?? 'Eliminación satisfactoria.',
    icon ?? null
  );
  refreshCb(currentPagination);
};
