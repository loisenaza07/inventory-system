import {
    Button,
    CardContent,
    Divider,
    Fade,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import MainCard from "@/Components/MainCard";
import MainLayout from "@/Layouts/MainLayout";
import { Head, router, useForm } from "@inertiajs/react";
import axios from "axios";
import MultiFileUpload from "@/Components/third-party/dropzone/MultiFile";
function BuatPengaduanBarang(props) {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const { data, setData, post, processing, errors } = useForm({
        barang: "",
        keterangan: "",
        gambar: [],
        layanan: "",
    });

    console.log(data);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("barang", data.barang);
        formData.append("keterangan", data.keterangan);
        formData.append("layanan", data.layanan);
        if (data.gambar && data.gambar.length > 0) {
            data.gambar.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });
        }
        axios
            .post(route("buat-pengaduan"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((page) => {
                console.log(page);
                setData({
                    barang: "",
                    keterangan: "",
                    gambar: [],
                    layanan: "",
                });
                router.visit(route("riwayat-pengaduan"));
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <MainLayout user={props?.auth.user} roles={props?.auth.roles}>
            <Head title="Buat Pengaduan" />
            <form
                noValidate
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MainCard title="">
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={6}>
                                    <Stack spacing={1}>
                                        <InputLabel>Jenis Layanan</InputLabel>
                                        <Select
                                            fullWidth
                                            value={data.layanan}
                                            name="layanan"
                                            onChange={handleChange}
                                            error={Boolean(errors.layanan)}
                                        >
                                            {props.layanan?.map((val) => (
                                                <MenuItem
                                                    value={val.id}
                                                    key={val.id}
                                                >
                                                    {val.jenis_layanan}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.layanan && (
                                            <FormHelperText error>
                                                {errors.layanan}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} lg={6}>
                                    <Stack spacing={1}>
                                        <InputLabel>Barang</InputLabel>
                                        <Select
                                            fullWidth
                                            value={data.barang}
                                            name="barang"
                                            onChange={handleChange}
                                            error={Boolean(errors.barang)}
                                        >
                                            {props.barang?.map((val) => (
                                                <MenuItem
                                                    value={val.id}
                                                    key={val.id}
                                                >
                                                    {val.merk}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {errors.barang && (
                                            <FormHelperText error>
                                                {errors.barang}
                                            </FormHelperText>
                                        )}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12}>
                                    <Stack spacing={1.25}>
                                        <InputLabel htmlFor="cal-start-date">
                                            Foto Barang
                                        </InputLabel>
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

                                <Grid item xs={12}>
                                    <Stack spacing={1}>
                                        <InputLabel>Keterangan</InputLabel>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={5}
                                            placeholder="Isi keterangan"
                                            value={data.keterangan}
                                            name="keterangan"
                                            onChange={handleChange}
                                            error={Boolean(errors.keterangan)}
                                        />
                                        {errors.keterangan && (
                                            <FormHelperText error>
                                                {errors.keterangan}
                                            </FormHelperText>
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
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                </Grid>
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
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleClose}
                            >
                                Ok
                            </Button>
                        </Stack>
                    </MainCard>
                </Fade>
            </Modal>
        </MainLayout>
    );
}

export default BuatPengaduanBarang;
