import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import axios from 'axios';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Calendar } from 'iconsax-react';
import {
  Button,
  CardContent,
  Divider,
  Fade,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Papa from 'papaparse'; // Import PapaParse

import MainCard from '@/Components/MainCard';
import MainLayout from '@/Layouts/MainLayout';
import MultiFileUpload from '@/Components/third-party/dropzone/MultiFile';

function TambahBarang(props) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const { data, setData, post, processing, errors } = useForm({
    // jenis_barang: '',
    // merk: '',
    // no_bmn: '',
    // status: '',
    // penanggung_jawab: '',
    // ruangan: '',
    // tahun_pengadaan: moment(),
    // nilai_pengadaan: 0,
    kode_barang: '',
    nama_barang: '',
    nup: '',
    kondisi: '',
    merek: '',
    tgl_perolehan: moment(),
    nilai_perolehan_pertama: '',
    pemegang_bmn: '',
    gambar: [],
    csv_file: null,
  });

  const handleChange = (e) => {
    if (e && e._isAMomentObject) {
      setData('tgl_perolehan', e); // set moment object
    } else {
      setData(e.target.name, e.target.value);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData('csv_file', file);

    Papa.parse(file, {
      header: true,
      complete: function (results) {
        const csvData = results.data[0];
        setData({
          ...data,
        //   jenis_barang: csvData.jenis_barang || '',
        //   merk: csvData.merk || '',
        //   no_bmn: csvData.no_bmn || '',
        //   status: csvData.status || '',
        //   penanggung_jawab: csvData.penanggung_jawab || '',
        //   ruangan: csvData.ruangan || '',
        //   tahun_pengadaan: csvData.tahun_pengadaan
        //     ? moment(csvData.tahun_pengadaan, 'YYYY-MM-DD')
        //     : moment(),
        //   nilai_pengadaan: csvData.nilai_pengadaan || 0,
            kode_barang: csvData.kode_barang || '',
            nama_barang: csvData.nama_barang || '',
            nup: csvData.nup || '',
            kondisi: csvData.kondisi || '',
            merek: csvData.merek || '',
            tgl_perolehan: csvData.tgl_perolehan? moment(csvData.tgl_perolehan, 'YYYY-MM-DD'): moment(),
            nilai_perolehan_pertama: csvData.nilai_perolehan_pertama || '',
            pemegang_bmn: csvData.pemegang_bmn || '',
        });
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    /*formData.append('jenis_barang', data.jenis_barang);
    formData.append('merk', data.merk);
    formData.append('no_bmn', data.no_bmn);
    formData.append('status', data.status);
    formData.append('penanggung_jawab', data.penanggung_jawab);
    formData.append('ruangan', data.ruangan);
    formData.append(
      'tahun_pengadaan',
      moment(data.tahun_pengadaan).format('YYYY-MM-DD')
    ormData.append('nilai_pengadaan', data.nilai_pengadaan);

    );*/
    formData.append('kode_barang', data.kode_barang);
    formData.append('nama_barang', data.nama_barang);
    formData.append('nup', data.nup);
    formData.append('kondisi', data.kondisi);
    formData.append('merek', data.merek);
    formData.append(
        'tgl_perolehan',
        moment(data.tgl_perolehan)).format('YYYY-MM-DD');
    formData.append('nilai_perolahan_pertama', data.nilai_perolehan_pertama);
    formData.append('pemegang_bmn', data.pemegang_bmn)
    if (data.gambar && data.gambar.length > 0) {
      data.gambar.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    }
    if (data.csv_file) {
      formData.append('csv_file', data.csv_file);
    }
    axios
      .post(route('tambah-barang'), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((page) => {
        setData({
        /*
          jenis_barang: '',
          merk: '',
          no_bmn: '',
          status: '',
          penanggung_jawab: '',
          ruangan: '',
          tahun_pengadaan: moment(), // reset to moment
          nilai_pengadaan: 0, */
          kode_barang: '',
          nama_barang: '',
          nup: '',
          kondisi: '',
          merek: '',
          tgl_perolehan: moment(),
          nilai_perolehan_pertama: '',
          pemegang_bmn: '',
          gambar: [],
          csv_file: null, // Reset CSV file
        });
        router.visit(route('daftar-barang-admin'));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <MainLayout user={props?.auth.user} roles={props?.auth.roles}>
      <Head title="Buat Pengaduan" />
      <form noValidate onSubmit={handleSubmit} encType="multipart/form-data">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MainCard title="">
                <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>kode barang</InputLabel>
                      <TextField
                        fullWidth
                        value={data.kode_barang}
                        name="kode_barang"
                        onChange={handleChange}
                        error={Boolean(errors.kode_barang)}
                      />
                      {errors.kode_barang && (
                        <FormHelperText error>{errors.kode_barang}</FormHelperText>
                      )}
                    </Stack>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>nama barang</InputLabel>
                      <TextField
                        fullWidth
                        value={data.nama_barang}
                        name="nama_barang"
                        onChange={handleChange}
                        error={Boolean(errors.nama_barang)}
                      />
                      {errors.nama_barang && (
                        <FormHelperText error>{errors.nama_barang}</FormHelperText>
                      )}
                    </Stack>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>NUP</InputLabel>
                      <TextField
                        fullWidth
                        value={data.nup}
                        name="nup"
                        onChange={handleChange}
                        error={Boolean(errors.nup)}
                      />
                      {errors.nup && (
                        <FormHelperText error>{errors.nup}</FormHelperText>
                      )}
                    </Stack>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>kondisi</InputLabel>
                      <TextField
                        fullWidth
                        value={data.kondisi}
                        name="kondisi"
                        onChange={handleChange}
                        error={Boolean(errors.kondisi)}
                      />
                      {errors.kondisi && (
                        <FormHelperText error>{errors.kondisi}</FormHelperText>
                      )}
                    </Stack>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>merek</InputLabel>
                      <TextField
                        fullWidth
                        value={data.merek}
                        name="merek"
                        onChange={handleChange}
                        error={Boolean(errors.merek)}
                      />
                      {errors.merek && (
                        <FormHelperText error>{errors.merek}</FormHelperText>
                      )}
                    </Stack>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>Tanggal perolehan</InputLabel>
                      <DatePicker
                        value={data.tgl_perolehan}
                        format="YYYY/MM/DD"
                        onChange={(newValue) =>
                          setData('tgl_perolehan', newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  sx={{
                                    cursor: 'pointer',
                                  }}
                                >
                                  <Calendar />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                      {errors.tgl_perolehan && (
                        <FormHelperText error>
                          {errors.tgl_perolehan}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>nilai perolahan pertama</InputLabel>
                      <TextField
                        fullWidth
                        value={data.nilai_perolehan_pertama}
                        name="nilai_perolehan_pertama"
                        onChange={handleChange}
                        error={Boolean(errors.nilai_perolehan_pertama)}
                      />
                      {errors.nilai_perolehan_pertama && (
                        <FormHelperText error>{errors.nilai_perolehan_pertama}</FormHelperText>
                      )}
                    </Stack>
                </Grid>

                <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>Pemegang BMN</InputLabel>
                      <TextField
                        fullWidth
                        value={data.pemegang_bmn}
                        name="pemegang_bmn"
                        onChange={handleChange}
                        error={Boolean(errors.pemegang_bmn)}
                      />
                      {errors.pemegang_bmn && (
                        <FormHelperText error>{errors.pemegang_bmn}</FormHelperText>
                      )}
                    </Stack>
                </Grid>

                {/*
                  <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>Jenis Barang</InputLabel>
                      <Select
                        fullWidth
                        value={data.jenis_barang}
                        name="jenis_barang"
                        onChange={handleChange}
                        error={Boolean(errors.jenis_barang)}
                        sx={{
                          textTransform: 'capitalize',
                        }}
                      >
                        {props.jenis_barang?.map((val) => (
                          <MenuItem
                            value={val.id}
                            key={val.id}
                            sx={{
                              textTransform: 'capitalize',
                            }}
                          >
                            {val.jenis_barang}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.jenis_barang && (
                        <FormHelperText error>
                          {errors.jenis_barang}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>Merk</InputLabel>
                      <TextField
                        fullWidth
                        value={data.merk}
                        name="merk"
                        onChange={handleChange}
                        error={Boolean(errors.merk)}
                      />
                      {errors.merk && (
                        <FormHelperText error>{errors.merk}</FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>Nomor BMN</InputLabel>
                      <TextField
                        fullWidth
                        value={data.no_bmn}
                        name="no_bmn"
                        onChange={handleChange}
                        error={Boolean(errors.no_bmn)}
                      />
                      {errors.no_bmn && (
                        <FormHelperText error>{errors.no_bmn}</FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>Status</InputLabel>
                      <Select
                        fullWidth
                        value={data.status}
                        name="status"
                        onChange={handleChange}
                        error={Boolean(errors.status)}
                      >
                        <MenuItem
                          value="Baik"
                          sx={{
                            textTransform: 'capitalize',
                          }}
                        >
                          Baik
                        </MenuItem>
                        <MenuItem
                          value="Rusak Ringan"
                          sx={{
                            textTransform: 'capitalize',
                          }}
                        >
                          Rusak Ringan
                        </MenuItem>
                        <MenuItem
                          value="Rusak Berat"
                          sx={{
                            textTransform: 'capitalize',
                          }}
                        >
                          Rusak Berat
                        </MenuItem>
                      </Select>
                      {errors.no_bmn && (
                        <FormHelperText error>{errors.no_bmn}</FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>Penanggung Jawab</InputLabel>
                      <Select
                        fullWidth
                        value={data.penanggung_jawab}
                        name="penanggung_jawab"
                        onChange={handleChange}
                        error={Boolean(errors.penanggung_jawab)}
                      >
                        {props.user?.map((val) => (
                          <MenuItem
                            value={val.id}
                            key={val.id}
                            sx={{
                              textTransform: 'capitalize',
                            }}
                          >
                            {val.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.penanggung_jawab && (
                        <FormHelperText error>
                          {errors.penanggung_jawab}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>Ruangan</InputLabel>
                      <Select
                        fullWidth
                        value={data.ruangan}
                        name="ruangan"
                        onChange={handleChange}
                        error={Boolean(errors.ruangan)}
                      >
                        {props.ruangan?.map((val) => (
                          <MenuItem
                            value={val.id}
                            key={val.id}
                            sx={{
                              textTransform: 'capitalize',
                            }}
                          >
                            {val.nama_ruangan}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.ruangan && (
                        <FormHelperText error>{errors.ruangan}</FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>Tahun Pengadaan</InputLabel>
                      <DatePicker
                        value={data.tahun_pengadaan}
                        format="DD/MM/YYYY"
                        onChange={(newValue) =>
                          setData('tahun_pengadaan', newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <InputAdornment
                                  position="end"
                                  sx={{
                                    cursor: 'pointer',
                                  }}
                                >
                                  <Calendar />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                      {errors.tahun_pengadaan && (
                        <FormHelperText error>
                          {errors.tahun_pengadaan}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>Nilai Pengadaan</InputLabel>
                      <TextField
                        fullWidth
                        value={data.nilai_pengadaan}
                        name="nilai_pengadaan"
                        type="number"
                        onChange={handleChange}
                        error={Boolean(errors.nilai_pengadaan)}
                      />
                      {errors.nilai_pengadaan && (
                        <FormHelperText error>
                          {errors.nilai_pengadaan}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid> */}

                  <Grid item xs={12}>
                    <Stack spacing={1.25}>
                      <InputLabel htmlFor="cal-start-date">Foto Barang</InputLabel>
                      <MultiFileUpload
                        setFieldValue={setData}
                        files={data.gambar}
                        error={!!errors.gambar}
                      />
                      {errors.gambar && (
                        <FormHelperText error={true}>
                          {errors.gambar}
                        </FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={6}>
                    <Stack spacing={1}>
                      <InputLabel>Import CSV</InputLabel>
                      <TextField
                        type="file"
                        inputProps={{
                          accept: '.csv',
                        }}
                        onChange={handleFileChange}
                        error={Boolean(errors.csv_file)}
                      />
                      {errors.csv_file && (
                        <FormHelperText error>{errors.csv_file}</FormHelperText>
                      )}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} lg={12} marginTop={4}>
                    <Button
                      variant="contained"
                      disableElevation
                      disabled={processing}
                      type="submit"
                      size="large"
                    >
                      Tambah Barang
                    </Button>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </LocalizationProvider>
      </form>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <MainCard title="Berhasil" modal darkTitle content={false}>
            <CardContent>
              <Typography id="modal-modal-description">
                Data pengaduan berhasil ditambahkan
              </Typography>
            </CardContent>
            <Divider />
            <Stack
              direction="row"
              spacing={1}
              justifyContent="flex-end"
              sx={{ px: 2.5, py: 2 }}
            >
              <Button variant="contained" size="small" onClick={handleClose}>
                Ok
              </Button>
            </Stack>
          </MainCard>
        </Fade>
      </Modal>
    </MainLayout>
  );
}

export default TambahBarang;
