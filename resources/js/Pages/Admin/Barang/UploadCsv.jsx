import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
    LocalizationProvider,
    MobileDateTimePicker,
} from "@mui/x-date-pickers";
import {
    Button,
    CardContent,
    Divider,
    Fade,
    FormHelperText,
    Grid,
    InputLabel,
    Modal,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import Papa from "papaparse"; // Import PapaParse

import MainCard from "@/Components/MainCard";
import MainLayout from "@/Layouts/MainLayout";
import MultiFileUpload from "@/Components/third-party/dropzone/MultiFile";

function UploadCsv(props) {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const { data, setData, post, processing, errors } = useForm({
        csv_file: null,
        gambar: [],
    });

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];
        if (file && file.type === "text/csv") {
            setData(name, file);
        } else {
            alert("Please upload a CSV file.");
        }
    };

    const handleMultiFileChange = (files) => {
        setData("gambar", files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (data.csv_file) {
            formData.append("csv_file", data.csv_file);
        }

        if (data.gambar && data.gambar.length > 0) {
            data.gambar.forEach((file, index) => {
                formData.append(`images[${index}]`, file);
            });
        }

        axios
            .post(route("upload-csv"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                router.visit(route("daftar-barang-admin"));
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <MainLayout user={props?.auth.user} roles={props?.auth.roles}>
            <Head title="Upload CSV" />
            <form
                noValidate
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <MainCard title="">
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Stack spacing={1.25}>
                                            <InputLabel htmlFor="cal-start-date">
                                                Foto Barang
                                            </InputLabel>
                                            <MultiFileUpload
                                                setFieldValue={handleMultiFileChange}
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
                                        <Stack spacing={1.25}>
                                            <InputLabel htmlFor="csv_file">
                                                Upload CSV
                                            </InputLabel>
                                            <input
                                                type="file"
                                                name="csv_file"
                                                accept=".csv"
                                                onChange={handleFileChange}
                                            />
                                            {errors.csv_file && (
                                                <FormHelperText error={true}>
                                                    {errors.csv_file}
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

export default UploadCsv;
