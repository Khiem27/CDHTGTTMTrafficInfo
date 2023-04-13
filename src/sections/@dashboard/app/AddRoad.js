import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import styles from './AddRoad.module.css';

AddRoad.propTypes = {};

function AddRoad() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const roadInfo = {
      ...data,
      postedAt: new Date().toISOString(),
      image: `/assets/images/covers/cover_${Math.floor(Math.random() * 24) + 1}.jpg`,
    };
    const road = JSON.parse(localStorage.getItem('road'));
    road.push(roadInfo);
    localStorage.setItem('road', JSON.stringify(road));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Helmet>
        <title> Dashboard | Tra cứu tuyến đường nguy hiểm </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}>
            <h1>Thêm đoạn đường</h1>
            <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2, mt: 4 }}>
              Thông tin đoạn đường nguy hiểm
            </Typography>

            <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '100ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Đường"
                variant="outlined"
                helperText="Tên đường"
                {...register('road', { required: true })}
              />
              <TextField
                {...register('district', { required: true })}
                id="outlined-basic"
                label="Quận/Huyện"
                variant="outlined"
                helperText="Tên quận/huyện"
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Tỉnh/Thành Phố"
                variant="outlined"
                helperText="Tên tỉnh/thành phố"
                {...register('city', { required: true })}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Thông tin cảnh báo"
                variant="outlined"
                {...register('description', { required: true })}
                helperText="Thông tin về tình trạng nguy hiểm của đoạn đường"
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Các giải pháp an toàn"
                variant="outlined"
                {...register('solution', { required: true })}
                helperText="Các giải pháp để giảm thiểu tình trạng nguy hiểm của đoạn đường"
              />
              <br />

              <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 1, mt: 4 }}>
                Thống kê số lượng tai nạn giao thông ở đoạn đường này
              </Typography>
              <br />

              <TextField
                id="outlined-basic"
                label="Tai nạn va chạm (số vụ)"
                defaultValue={0}
                variant="outlined"
                {...register('accident1', { required: true })}
                helperText="Đây là loại tai nạn giao thông phổ biến nhất ở Việt Nam, khi hai hoặc nhiều phương tiện va chạm với nhau."
              />
              <br />

              <TextField
                id="outlined-basic"
                label="Tai nạn liên quan đến người đi bộ (số vụ)"
                variant="outlined"
                defaultValue={0}
                {...register('accident2', { required: true })}
                helperText="Tại Việt Nam, nhiều người đi bộ không tuân thủ quy tắc giao thông, đi qua đường không qua lề đường, làm tăng nguy cơ xảy ra tai nạn."
              />
              <br />

              <TextField
                id="outlined-basic"
                label="Tai nạn do quá tải (số vụ)"
                variant="outlined"
                defaultValue={0}
                {...register('accident3', { required: true })}
                helperText="Việc chở quá tải trọng là một vấn đề phổ biến ở Việt Nam, gây ra nguy cơ tai nạn giao thông."
              />
              <br />

              <TextField
                id="outlined-basic"
                label="Tai nạn do lái xe mệt mỏi (số vụ)"
                variant="outlined"
                defaultValue={0}
                {...register('accident4', { required: true })}
                helperText=" Nhiều tài xế lái xe trong thời gian dài mà không nghỉ ngơi đủ, gây ra tình trạng mệt mỏi, giảm khả năng tập trung, dẫn đến tai nạn."
              />
              <br />

              <Typography id="modal-modal-title" variant="h4" component="h2" sx={{ mb: 2, mt: 4 }}>
                Thông tin chi tiết
              </Typography>
              <br />
              <TextField
                id="outlined-basic"
                label="Chiều dài đoạn đường"
                variant="outlined"
                {...register('length', { required: true })}
                helperText="Chiều dài của đoạn đường (đơn vị: mét)"
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Chiều rộng đoạn đường"
                variant="outlined"
                {...register('width', { required: true })}
                helperText="Chiều rộng của đoạn đường (đơn vị: mét)"
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Loại đường"
                variant="outlined"
                {...register('type', { required: true })}
                helperText="Loại đường (đường bộ, đường sắt, đường thủy, đường hàng không)"
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Vật liệu xây dựng đường"
                variant="outlined"
                {...register('material', { required: true })}
                helperText="Đây là vật liệu được sử dụng để xây dựng đường, ví dụ như bê tông, nhựa đường, đá granite, vv. Loại vật liệu này sẽ phụ thuộc vào chi phí, môi trường và nhu cầu sử dụng đường."
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Điểm đầu (Toạ độ)"
                variant="outlined"
                {...register('start', { required: true })}
                helperText="Toạ độ của điểm đầu của đoạn đường (định dạng: độ, phút, giây)"
              />
              <TextField
                id="outlined-basic"
                label="Điểm đầu (Toạ độ)"
                variant="outlined"
                {...register('end', { required: true })}
                helperText="Toạ độ của điểm đầu của đoạn đường (định dạng: độ, phút, giây)"
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Tốc độ giới hạn"
                variant="outlined"
                {...register('speed', { required: true })}
                helperText="Tốc độ tối đa được phép đi trên đoạn đường (đơn vị: km/h)"
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Điều kiện đường"
                variant="outlined"
                {...register('condition', { required: true })}
                helperText=" Điều kiện của đường, ví dụ như đường ướt, đường khô, đường dốc, vv. Các điều kiện này sẽ ảnh hưởng đến an toàn khi di chuyển trên đường."
              />
              <br />
              <TextField
                id="outlined-basic"
                label="Các đặc điểm khác"
                variant="outlined"
                {...register('feature', { required: true })}
                helperText="Các đặc điểm khác của đoạn đường, ví dụ như đường giao nhau, đường có đèn giao thông, đường có đèn báo hiệu, có thể bao gồm các đặc điểm địa hình, cấu trúc đường, hệ thống thoát nước. Các đặc điểm này sẽ ảnh hưởng đến khả năng vận hành của xe trên đường."
              />
            </Box>
            <button type="submit" className={styles.button}>
              Đóng góp
            </button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}

export default AddRoad;
